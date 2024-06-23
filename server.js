require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const msal = require('@azure/msal-node');
const saveDoctorToOneDrive = require('./saveDoctor');
const removeDoctorFromOneDrive = require('./removeDoctor');

const app = express();

const config = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        },
    },
};

const cca = new msal.ConfidentialClientApplication(config);

app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use(session({
    secret: 'your_secret_key', // replace with a strong secret key
    resave: false,
    saveUninitialized: true,
}));

app.get('/auth/login', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["https://graph.microsoft.com/.default"],
        redirectUri: process.env.REDIRECT_URI,
    };

    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

app.get('/auth/callback', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["https://graph.microsoft.com/.default"],
        redirectUri: process.env.REDIRECT_URI,
    };

    cca.acquireTokenByCode(tokenRequest).then((response) => {
        req.session.accessToken = response.accessToken;
        res.status(200).send('Authentication successful! You can close this tab and return to the app.');
    }).catch((error) => {
        console.log(error);
        res.status(500).send('Error during authentication. Please try again.');
    });
});

async function getAccessToken(req) {
    if (!req.session.accessToken) {
        throw new Error('No access token in session. Please authenticate.');
    }
    return req.session.accessToken;
}

app.post('/api/doctors', async (req, res) => {
    try {
        const doctor = req.body;
        console.log('Received doctor data:', doctor);
        const accessToken = await getAccessToken(req);
        const response = await saveDoctorToOneDrive(doctor, accessToken);
        res.status(200).json({ message: 'Doctor data saved successfully', response });
    } catch (error) {
        console.error('Failed to save doctor data:', error);
        res.status(500).json({ message: 'Failed to save doctor data', error: error.message });
    }
});

app.delete('/api/doctors', async (req, res) => {
    try {
        const doctor = req.body;
        const fileName = `${process.env.ONE_DRIVE_FOLDER_PATH}/${doctor.name}_${doctor.profession}.json`;
        const accessToken = await getAccessToken(req);
        await removeDoctorFromOneDrive(fileName, accessToken);
        res.status(200).json({ message: 'Doctor data removed successfully' });
    } catch (error) {
        console.error('Failed to remove doctor data:', error);
        res.status(500).json({ message: 'Failed to remove doctor data', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});