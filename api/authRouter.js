const express = require('express');
const msal = require('@azure/msal-node');
require('dotenv').config();

const router = express.Router();

const config = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
    },
};

const cca = new msal.ConfidentialClientApplication(config);

router.get('/callback', async (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["https://graph.microsoft.com/.default"],
        redirectUri: process.env.REDIRECT_URI,
    };

    try {
        const authResponse = await cca.acquireTokenByCode(tokenRequest);
        res.status(200).send('Authentication successful! You can close this tab and return to the app.');
    } catch (error) {
        console.error("Error in acquireTokenByCode:", error);
        res.status(500).send('Error during authentication. Please try again.');
    }
});

module.exports = router;