const axios = require('axios');
const getAccessToken = require('./getAccessToken');

module.exports = async (req, res) => {
    const { name, profession } = req.body;

    if (!name || !profession) {
        return res.status(400).json({ message: 'Name and profession are required.' });
    }

    try {
        const accessToken = await getAccessToken();

        const config = {
            method: 'delete',
            url: `https://graph.microsoft.com/v1.0/users/a14ef30693180bcf/drive/root:/HistoPathology Lab/Doctor Details/${name}.txt`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        await axios(config);
        res.status(200).json({ message: `Doctor ${name} (${profession}) data removed successfully.` });
    } catch (error) {
        console.error('Error removing doctor data:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error removing doctor data' });
    }
};
