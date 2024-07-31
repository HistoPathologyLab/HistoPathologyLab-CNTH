const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { getAccessToken } = require('./getAccessToken'); // Adjust the path if placed in a different folder

dotenv.config();

const app = express();
app.use(bodyParser.json());

const saveDoctor = require('./api/saveDoctor');
const removeDoctor = require('./api/removeDoctor');

app.post('/api/saveDoctor', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        console.log('Access Token in server.js:', accessToken);  // Add this line to debug
        await saveDoctor(req, res, accessToken);
    } catch (error) {
        console.error('Error in /api/saveDoctor:', error);
        res.status(500).send('Error saving doctor details');
    }
});

app.post('/api/removeDoctor', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        console.log('Access Token in server.js:', accessToken);  // Add this line to debug
        await removeDoctor(req, res, accessToken);
    } catch (error) {
        console.error('Error in /api/removeDoctor:', error);
        res.status(500).send('Error removing doctor details');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
