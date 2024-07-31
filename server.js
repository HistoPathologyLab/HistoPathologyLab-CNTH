const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { getAccessToken } = require('./getAccessToken');

dotenv.config();

console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);
console.log('TENANT_ID:', process.env.TENANT_ID);
console.log('REDIRECT_URI:', process.env.REDIRECT_URI);

const app = express();
app.use(bodyParser.json());

const saveDoctor = require('./api/saveDoctor');
const removeDoctor = require('./api/removeDoctor');

app.post('/api/saveDoctor', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        await saveDoctor(req, res, accessToken);
    } catch (error) {
        res.status(500).send('Error saving doctor details');
    }
});

app.post('/api/removeDoctor', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        await removeDoctor(req, res, accessToken);
    } catch (error) {
        res.status(500).send('Error removing doctor details');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
