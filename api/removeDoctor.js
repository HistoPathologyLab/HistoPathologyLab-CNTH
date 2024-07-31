const axios = require('axios');

module.exports = async (req, res, accessToken) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ message: 'Name is required.' });
    }

    const config = {
        method: 'delete',
        url: `https://graph.microsoft.com/v1.0/me/drive/root:/HistoPathology Lab/Doctor Details/${name}.txt`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        await axios(config);
        res.status(200).json({ message: 'Doctor data removed successfully.' });
    } catch (error) {
        console.error('Error in removeDoctor:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error removing doctor data' });
    }
};
