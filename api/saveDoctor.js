const axios = require('axios');
const getAccessToken = require('../getAccessToken');

async function saveDoctor(req, res) {
    const { name, profession } = req.body;

    try {
        const accessToken = await getAccessToken();

        const response = await axios.put(
            `https://graph.microsoft.com/v1.0/me/drive/root:/HistoPathology Lab/Doctor Details/${name}.txt:/content`,
            `Name: ${name}\nProfession: ${profession}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'text/plain'
                }
            }
        );

        res.status(200).send('Doctor data saved successfully');
    } catch (error) {
        console.error('Error saving doctor data:', error);
        res.status(500).send({ error: 'Failed to save doctor data' });
    }
}

module.exports = saveDoctor;
