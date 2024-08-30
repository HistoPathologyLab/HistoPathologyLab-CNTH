const msal = require('@azure/msal-node');

const config = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
    }
};

const cca = new msal.ConfidentialClientApplication(config);

async function getAccessToken() {
    try {
        const result = await cca.acquireTokenByClientCredential({
            scopes: ["https://graph.microsoft.com/.default"]
        });
        return result.accessToken;
    } catch (error) {
        console.error("Error acquiring access token: ", error);
        throw new Error("Failed to acquire access token.");
    }
}

module.exports = getAccessToken;
