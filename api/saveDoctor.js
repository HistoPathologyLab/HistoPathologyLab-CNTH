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
        const response = await axios.post(tokenUrl, qs.stringify(tokenData), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
        throw new Error('Error obtaining access token');
    }
}

async function createFolderIfNotExists(folderPath, accessToken) {
    const createFolderUrl = `https://graph.microsoft.com/v1.0/me/drive/root:${folderPath}`;
    const folderData = {
        name: folderPath.split('/').pop(),
        folder: {},
        '@microsoft.graph.conflictBehavior': 'rename'
    };

    try {
        await axios.post(createFolderUrl, folderData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(`Folder ${folderPath} created successfully.`);
    } catch (error) {
        if (error.response && error.response.status !== 409) {
            console.error('Error creating folder:', error.response ? error.response.data : error.message);
            throw new Error('Error creating folder');
        }
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
        const accessToken = await getAccessToken();
        await createFolderIfNotExists(folderPath, accessToken);
        const createFileUrl = `https://graph.microsoft.com/v1.0/me/drive/root:${filePath}:/content`;

        await axios.put(createFileUrl, fileContent, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'text/plain'
            }
