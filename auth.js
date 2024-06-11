const { PublicClientApplication } = require('@azure/msal-node');

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: 'LeR8Q~x~GPxi2~bZOkfSO.nNhe_g2KDHgkfHdarG', // Replace with your actual client secret value
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