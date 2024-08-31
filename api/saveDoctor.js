// api/saveDoctor.js
const axios = require('axios');
const getAccessToken = require('./getAccessToken'); // Correct path

module.exports = async (req, res) => {
    const { name, profession } = req.body;

    if (!name || !profession) {
        return res.status(400).json({ message: 'Name and profession are required.' });
    }

    try {
        const accessToken = await getAccessToken();

        const config = {
            method: 'put',
            url: `https://graph.microsoft.com/v1.0/me/drive/root:/HistoPathology Lab/Doctor Details/${name}.txt:/content`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'text/plain'
            },
            data: `Name: ${name}\nProfession: ${profession}`
        };

        await axios(config);
        res.status(200).json({ message: 'Doctor data saved successfully.' });
    } catch (error) {
        console.error('Error saving doctor data:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error saving doctor data' });
    }
};
