const axios = require('axios');
const qs = require('qs');

module.exports = async (req, res) => {
    const { name, profession } = req.body;
    
    if (!name || !profession) {
        return res.status(400).json({ message: 'Name and profession are required.' });
    }

    const accessToken = process.env.ACCESS_TOKEN;

    const data = {
        name: name,
        profession: profession
    };

    const config = {
        method: 'put',
        url: `https://graph.microsoft.com/v1.0/me/drive/root:/HistoPathology Lab/Doctor Details/${name}.txt:/content`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'text/plain'
        },
        data: `Name: ${name}\nProfession: ${profession}`
    };

    try {
        await axios(config);
        res.status(200).json({ message: 'Doctor data saved successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving doctor data' });
    }
};
