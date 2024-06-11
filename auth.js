const { PublicClientApplication } = require('@azure/msal-node');

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET, // Use the environment variable
  },
};

const pca = new PublicClientApplication(msalConfig);

async function getAccessToken() {
  try {
    const authResponse = await pca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    return authResponse.accessToken;
  } catch (error) {
    console.error('Error acquiring access token:', error);
    throw error;
  }
}

module.exports = { getAccessToken };