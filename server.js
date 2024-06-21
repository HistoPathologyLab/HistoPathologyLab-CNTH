require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const msal = require('@azure/msal-node');
const saveDoctorToOneDrive = require('./api/saveDoctor');
const removeDoctorFromOneDrive = require('./api/removeDoctor');

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/common`,
        clientSecret: process.env.CLIENT_SECRET,
    },
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

let token = null;

app.use(cors({
    origin: '*', // Adjust this for security if needed
}));
app.use(express.json());

app.get('/auth/callback', async (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["https://graph.microsoft.com/.default"],
        redirectUri: process.env.REDIRECT_URI,
    };

    try {
        const response = await cca.acquireTokenByCode(tokenRequest);
        token = response.accessToken;
        res.send('Authentication successful! You can close this tab and return to the app.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during authentication');
    }
});

app.post('/api/doctors', async (req, res) => {
    try {
        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const doctor = req.body;
        console.log('Received doctor data:', doctor);
        const response = await saveDoctorToOneDrive(doctor, token);
        res.status(200).json({ message: 'Doctor data saved successfully', response });
    } catch (error) {
        console.error('Failed to save doctor data:', error);
        res.status(500).json({ message: 'Failed to save doctor data', error: error.message });
    }
});

app.delete('/api/doctors', async (req, res) => {
    try {
        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const doctor = req.body;
        const fileName = `HistoPathology Lab/Doctors/${doctor.name}_${doctor.profession}.json`;
        await removeDoctorFromOneDrive(fileName, token);
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