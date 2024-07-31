const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { getAccessToken } = require('./getAccessToken');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const saveDoctor = require('./api/saveDoctor');
const removeDoctor = require('./api/removeDoctor');

app.post('/api/saveDoctor', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        console.log('Access Token in saveDoctor:', accessToken); // Ensure this logs the token
        await saveDoctor(req, res, accessToken);
    } catch (error) {
        console.error('Error saving doctor data:', error);
        res.status(500).send('Error saving doctor details');
    }
});

app.post('/api/removeDoctor', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        console.log('Access Token in removeDoctor:', accessToken); // Ensure this logs the token
        await removeDoctor(req, res, accessToken);
    } catch (error) {
        console.error('Error removing doctor data:', error);
        res.status(500).send('Error removing doctor details');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
