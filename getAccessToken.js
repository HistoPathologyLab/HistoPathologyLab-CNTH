require('dotenv').config();
const { ConfidentialClientApplication } = require('@azure/msal-node');

const config = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
    },
};

const cca = new ConfidentialClientApplication(config);

async function getAccessToken() {
    const tokenRequest = {
        scopes: ['https://graph.microsoft.com/.default'],
    };

    try {
        const tokenResponse = await cca.acquireTokenByClientCredential(tokenRequest);
        console.log("Access Token from getAccessToken:", tokenResponse.accessToken);
        return tokenResponse.accessToken;
    } catch (error) {
        console.error("Error acquiring access token", error);
        throw error;
    }
}

module.exports = getAccessToken;
