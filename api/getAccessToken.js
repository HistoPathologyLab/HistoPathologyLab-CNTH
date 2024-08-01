const msal = require('@azure/msal-node');
require('dotenv').config();

const msalConfig = {
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
        }
    }
};

const pca = new msal.ConfidentialClientApplication(msalConfig);

const tokenRequest = {
    scopes: ["user.read", "Files.ReadWrite.All"],
    redirectUri: process.env.REDIRECT_URI, // Ensure this line is present
};

async function getAccessToken(authCode) {
    try {
        const tokenResponse = await pca.acquireTokenByCode({ ...tokenRequest, code: authCode });
        return tokenResponse.accessToken;
    } catch (error) {
        console.error('Error acquiring access token:', error);
        throw error;
    }
}

async function getAuthCodeUrl() {
    const authCodeUrlParameters = {
        scopes: ["user.read", "Files.ReadWrite.All"],
        redirectUri: process.env.REDIRECT_URI, // Ensure this line is present
    };

    try {
        const authCodeUrlResponse = await pca.getAuthCodeUrl(authCodeUrlParameters);
        return authCodeUrlResponse;
    } catch (error) {
        console.error('Error getting auth code URL:', error);
        throw error;
    }
}

module.exports = { getAccessToken, getAuthCodeUrl };
