require('dotenv').config();
const express = require('express');
const msal = require('@azure/msal-node');
const session = require('express-session');

const router = express.Router();

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

router.use(session({
    secret: 'your_secret_key', // replace with a strong secret key
    resave: false,
    saveUninitialized: true,
}));

router.get('/login', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["https://graph.microsoft.com/.default"],
        redirectUri: process.env.REDIRECT_URI,
    };

    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

router.get('/callback', (req, res) => {
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

module.exports = {
    router,
    getAccessToken
};