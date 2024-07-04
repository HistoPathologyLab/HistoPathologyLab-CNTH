const axios = require('axios');
const qs = require('qs');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;
const redirectUri = process.env.REDIRECT_URI;

async function getAccessToken() {
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const tokenData = {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default'
    };

    try {
        console.log('Requesting access token...'); // Debug log
        const response = await axios.post(tokenUrl, qs.stringify(tokenData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('Access token obtained:', response.data.access_token); // Debug log
        return response.data.access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
        throw new Error('Error obtaining access token');
    }
}

module.exports = async (req, res) => {
    const { name, profession } = req.body;

    if (!name || !profession) {
        return res.status(400).json({ message: 'Name and profession are required' });
    }

    const fileName = `${name.replace(/\s+/g, '_')}_${profession.replace(/\s+/g, '_')}.txt`;
    const folderPath = '/HistoPathology Lab/Doctor Details';
    const filePath = `${folderPath}/${fileName}`;
    const fileContent = JSON.stringify({ name, profession });

    try {
        console.log('Getting access token...'); // Debug log
        const accessToken = await getAccessToken();
        console.log('Access token:', accessToken); // Debug log
        const createFileUrl = `https://graph.microsoft.com/v1.0/me/drive/root:${filePath}:/content`;

        console.log('Saving file to OneDrive:', filePath); // Debug log
        await axios.put(createFileUrl, fileContent, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'text/plain'
            }
        });

        res.status(200).json({ message: 'Doctor data saved successfully' });
    } catch (error) {
        console.error('Error saving doctor data:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error saving doctor data' });
    }
};
