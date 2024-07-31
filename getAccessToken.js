const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, TENANT_ID } = process.env;

// Log environment variables to verify they are loaded
console.log('CLIENT_ID:', CLIENT_ID);
console.log('CLIENT_SECRET:', CLIENT_SECRET);
console.log('TENANT_ID:', TENANT_ID);

async function getAccessToken() {
  const tokenEndpoint = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

  const requestBody = {
    client_id: CLIENT_ID,
    scope: 'https://graph.microsoft.com/.default',
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials'
  };

  try {
    const response = await axios.post(tokenEndpoint, qs.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token } = response.data;
    console.log('Access Token Retrieved:', access_token); // Debug log
    return access_token;
  } catch (error) {
    console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
    throw new Error('Could not obtain access token');
  }
}

module.exports = { getAccessToken };
