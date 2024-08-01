const msal = require('@azure/msal-node');
require('dotenv').config();

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
    },
};

const pca = new msal.PublicClientApplication(msalConfig);

const tokenRequest = {
    scopes: ["user.read", "Files.ReadWrite.All"],
    redirectUri: process.env.REDIRECT_URI,
};

async function getAccessToken(authCode) {
    try {
        const tokenResponse = await pca.acquireTokenByCode({ ...tokenRequest, code: authCode });
        return tokenResponse.accessToken;
    } catch (error) {
        console.error('Error acquiring access token:', error); // Log the specific error
        throw error;
    }
}

async function getAuthCodeUrl() {
    const authCodeUrlParameters = {
        scopes: ["user.read", "Files.ReadWrite.All"],
        redirectUri: process.env.REDIRECT_URI,
    };

    try {
        const authCodeUrlResponse = await pca.getAuthCodeUrl(authCodeUrlParameters);
        return authCodeUrlResponse;
    } catch (error) {
        console.error('Error getting auth code URL:', error); // Log the specific error
        throw error;
    }
}

module.exports = { getAccessToken, getAuthCodeUrl };
