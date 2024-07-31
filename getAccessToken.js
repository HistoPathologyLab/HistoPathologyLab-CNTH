const { ConfidentialClientApplication } = require('@azure/msal-node');
require('dotenv').config();

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
    },
};

const cca = new ConfidentialClientApplication(msalConfig);

async function getAccessToken() {
    const clientCredentialRequest = {
        scopes: ["https://graph.microsoft.com/.default"],
    };

    try {
        const response = await cca.acquireTokenByClientCredential(clientCredentialRequest);
        return response.accessToken;
    } catch (error) {
        console.error('Error acquiring access token:', error);
        throw error;
    }
}

module.exports = getAccessToken;
