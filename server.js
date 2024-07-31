const express = require('express');
const getAccessToken = require('./getAccessToken');
const axios = require('axios');
require('dotenv').config(); // Include dotenv

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/saveDoctor', async (req, res) => {
    const { name, profession } = req.body;

    try {
        const accessToken = await getAccessToken();
        console.log('Access Token in saveDoctor:', accessToken); // Debugging line

        const fileName = `${name}.txt`;
        const fileContent = `Name: ${name}\nProfession: ${profession}`;

        const url = `https://graph.microsoft.com/v1.0/me/drive/root:/HistoPathology Lab/Doctor Details/${encodeURIComponent(fileName)}:/content`;

        const response = await axios.put(url, fileContent, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'text/plain'
            }
        });

        console.log('File created:', response.data);
        res.status(200).send('Doctor data saved successfully');
    } catch (error) {
        console.error('Error saving doctor data:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to save doctor data');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
