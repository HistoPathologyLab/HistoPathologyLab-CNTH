const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { getAccessToken } = require('./getAccessToken'); // Adjust the path if placed in a different folder

dotenv.config(); // This should be at the top

const app = express();
app.use(bodyParser.json());

const saveDoctor = require('./api/saveDoctor');
const removeDoctor = require('./api/removeDoctor');

// Log environment variables to verify they are loaded
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);
console.log('TENANT_ID:', process.env.TENANT_ID);

app.post('/api/saveDoctor', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        console.log('Access Token in /api/saveDoctor:', accessToken); // Debug log
        await saveDoctor(req, res, accessToken);
    } catch (error) {
        console.error('Error in /api/saveDoctor:', error);
        res.status(500).send('Error saving doctor details');
    }
});

app.post('/api/removeDoctor', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        console.log('Access Token in /api/removeDoctor:', accessToken); // Debug log
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
