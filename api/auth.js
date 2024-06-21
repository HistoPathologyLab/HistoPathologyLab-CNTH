const msal = require('@azure/msal-node');
require('dotenv').config();

const config = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
    },
};

const cca = new msal.ConfidentialClientApplication(config);

async function getAccessToken() {
    const clientCredentialRequest = {
        scopes: ["https://graph.microsoft.com/.default"],
    };

    try {
        const authResponse = await cca.acquireTokenByClientCredential(clientCredentialRequest);
        console.log("Access token:", authResponse.accessToken);
        return authResponse.accessToken;
    } catch (error) {
        console.error("Failed to acquire token:", error);
        throw new Error('Failed to get access token');
    }
}

module.exports = getAccessToken;