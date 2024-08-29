const axios = require('axios');
const qs = require('qs');
const dotenv = require('dotenv');

dotenv.config();

async function getAccessToken() {
    const tenantId = process.env.TENANT_ID;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    const requestBody = qs.stringify({
        client_id: clientId,
        scope: 'https://graph.microsoft.com/.default',
        client_secret: clientSecret,
        grant_type: 'client_credentials'
    });

    try {
        const response = await axios.post(tokenEndpoint, requestBody, {
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded' 
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        throw new Error('Could not fetch access token');
    }
}

module.exports = getAccessToken;
