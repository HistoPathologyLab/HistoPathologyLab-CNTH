const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const querystring = require('querystring');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const TENANT_ID = process.env.TENANT_ID;

let token = null;

router.get('/login', (req, res) => {
    const authUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&response_mode=query&scope=offline_access%20user.read%20files.readwrite.all`;
    res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
    const code = req.query.code;

    const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
    const params = querystring.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code: code,
        grant_type: 'authorization_code'
    });

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
        const data = await response.json();
        token = data.access_token;
        req.session.token = token;
        res.redirect('/home.html');
    } catch (error) {
        res.status(500).send('Authentication failed');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

function getAuthenticatedClient() {
    if (!token) {
        throw new Error('No token found');
    }
    return token;
}

module.exports = router;
module.exports.getAuthenticatedClient = getAuthenticatedClient;
