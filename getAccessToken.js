const axios = require('axios');
const qs = require('qs');
require('dotenv').config(); // Include dotenv

async function getAccessToken() {
    const tenantID = process.env.TENANT_ID;
    const clientID = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const url = `https://login.microsoftonline.com/${tenantID}/oauth2/v2.0/token`;

    const data = {
        grant_type: 'client_credentials',
        client_id: clientID,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default'
    };

    try {
        const response = await axios.post(url, qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('Access token:', response.data.access_token); // Debugging line
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get access token');
    }
}

module.exports = getAccessToken;
