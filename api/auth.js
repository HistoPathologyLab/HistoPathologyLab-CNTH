const express = require('express');
const router = express.Router();
const { getAuthenticatedClient } = require('./onedrive');

router.get('/login', (req, res) => {
    const authUrl = getAuthenticatedClient().getAuthCodeUrl();
    res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) {
            throw new Error('Authorization code is missing');
        }

        const client = getAuthenticatedClient();
        await client.getTokenFromCode(code);
        req.session.authenticated = true;
        res.send('Authentication successful');
    } catch (error) {
        res.status(500).send(`Authentication failed: ${error.message}`);
    }
});

module.exports = router;
