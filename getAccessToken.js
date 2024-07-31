const msal = require('@azure/msal-node');
require('dotenv').config();

const clientConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET
    }
};

const cca = new msal.ConfidentialClientApplication(clientConfig);

async function getAccessToken() {
    const clientCredentialRequest = {
        scopes: ['https://graph.microsoft.com/.default']
    };

    try {
        const response = await cca.acquireTokenByClientCredential(clientCredentialRequest);
        console.log('Access Token:', response.accessToken); // Log the token to the console
        return response.accessToken;
    } catch (error) {
        console.error('Error acquiring token:', error);
        throw error;
    }
}

module.exports = getAccessToken;
