const axios = require('axios');
const getAccessToken = require('./getAccessToken');

module.exports = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required.' });
    }

    try {
        const accessToken = await getAccessToken();

        const config = {
            method: 'delete',
            url: `https://graph.microsoft.com/v1.0/me/drive/root:/HistoPathology Lab/Doctor Details/${name}.txt`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        await axios(config);
        res.status(200).json({ message: 'Doctor data removed successfully.' });
    } catch (error) {
        console.error('Error removing doctor data:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error removing doctor data' });
    }
};
