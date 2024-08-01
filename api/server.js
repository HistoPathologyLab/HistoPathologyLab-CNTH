const express = require('express');
const { getAccessToken, getAuthCodeUrl } = require('./getAccessToken'); // Updated path
const saveDoctor = require('./saveDoctor');
const removeDoctor = require('./removeDoctor');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 1: Redirect user to the authentication URL
app.get('/auth', async (req, res) => {
    try {
        const authCodeUrl = await getAuthCodeUrl();
        res.redirect(authCodeUrl);
    } catch (error) {
        res.status(500).send('Error getting auth code URL');
    }
});

// Step 2: Handle redirect and get access token
app.get('/auth/callback', async (req, res) => {
    const authCode = req.query.code;

    try {
        const accessToken = await getAccessToken(authCode);
        res.send(`Access Token: ${accessToken}`);
    } catch (error) {
        res.status(500).send('Error getting token');
    }
});

// Routes
app.post('/api/saveDoctor', saveDoctor);
app.post('/api/removeDoctor', async (req, res) => {
    const authCode = req.query.code;
    const accessToken = await getAccessToken(authCode);
    await removeDoctor(req, res, accessToken);
});

module.exports = app;
