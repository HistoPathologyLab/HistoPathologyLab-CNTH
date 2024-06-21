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

let accessToken;
let refreshToken;

async function getAccessToken() {
    if (!accessToken) {
        const tokenRequest = {
            scopes: ["https://graph.microsoft.com/.default"],
            redirectUri: process.env.REDIRECT_URI,
        };

        try {
            const authResponse = await cca.acquireTokenByClientCredential(tokenRequest);
            accessToken = authResponse.accessToken;
            refreshToken = authResponse.refreshToken;
        } catch (error) {
            console.error("Error in acquireTokenByClientCredential:", error);
            throw new Error('Failed to get access token');
        }
    }

    return accessToken;
}

async function refreshAccessToken() {
    const tokenRequest = {
        refreshToken: refreshToken,
        scopes: ["https://graph.microsoft.com/.default"],
        redirectUri: process.env.REDIRECT_URI,
    };

    try {
        const authResponse = await cca.acquireTokenByRefreshToken(tokenRequest);
        accessToken = authResponse.accessToken;
        refreshToken = authResponse.refreshToken;
        return accessToken;
    } catch (error) {
        console.error("Error in acquireTokenByRefreshToken:", error);
        throw new Error('Failed to refresh access token');
    }
}

module.exports = { getAccessToken, refreshAccessToken };