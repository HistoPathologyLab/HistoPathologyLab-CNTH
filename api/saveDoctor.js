const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tenantId = process.env.TENANT_ID;

async function getAccessToken() {
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const tokenData = {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default'
    };

    try {
        console.log('Requesting access token...');
        const response = await axios.post(tokenUrl, qs.stringify(tokenData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('Access token obtained:', response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
        throw new Error('Error obtaining access token');
    }
}

async function createFolderIfNotExists(accessToken, folderPath) {
    const folderUrl = `https://graph.microsoft.com/v1.0/me/drive/root:${folderPath}`;
    try {
        await axios.get(folderUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log(`Folder ${folderPath} already exists.`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log(`Folder ${folderPath} does not exist. Creating...`);
            await axios.put(folderUrl, null, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(`Folder ${folderPath} created.`);
        } else {
            throw error;
        }
    }
}

module.exports = async (req, res) => {
    const { name, profession } = req.body;

    if (!name || !profession) {
        console.log('Validation failed: Name and profession are required');
        return res.status(400).json({ message: 'Name and profession are required' });
    }

    const fileName = `${name.replace(/\s+/g, '_')}_${profession.replace(/\s+/g, '_')}.txt`;
    const folderPath = '/HistoPathology Lab/Doctor Details';
    const filePath = `${folderPath}/${fileName}`;
    const fileContent = JSON.stringify({ name, profession });

    try {
        console.log('Getting access token...');
        const accessToken = await getAccessToken();
        console.log('Access token:', accessToken);

        // Ensure the folder exists
        await createFolderIfNotExists(accessToken, folderPath);

        const createFileUrl = `https://graph.microsoft.com/v1.0/me/drive/root:${filePath}:/content`;
        console.log('Saving file to OneDrive:', filePath);

        const response = await axios.put(createFileUrl, fileContent, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'text/plain'
            }
        });

        console.log('File saved successfully:', response.data);
        res.status(200).json({ message: 'Doctor data saved successfully' });
    } catch (error) {
        console.error('Error saving doctor data:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error saving doctor data', details: error.response ? error.response.data : error.message });
    }
};
