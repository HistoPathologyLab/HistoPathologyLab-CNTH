const express = require('express');
const getAccessToken = require('./getAccessToken');
const saveDoctor = require('./api/saveDoctor');
const removeDoctor = require('./api/removeDoctor');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test-token', async (req, res) => {
    try {
        const token = await getAccessToken();
        res.send(`Access Token: ${token}`);
    } catch (error) {
        res.status(500).send('Error getting token');
    }
});

// Routes
app.post('/api/saveDoctor', saveDoctor);
app.post('/api/removeDoctor', async (req, res) => {
    const accessToken = await getAccessToken();
    await removeDoctor(req, res, accessToken);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
