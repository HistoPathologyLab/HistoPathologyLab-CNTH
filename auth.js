const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const tenantId = process.env.TENANT_ID;

// Function to get an authenticated client
const getAuthenticatedClient = async (code) => {
  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const tokenResponse = await axios.post(
    tokenEndpoint,
    querystring.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return tokenResponse.data;
};

// Authentication route
router.get('/auth', (req, res) => {
  const authEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`;
  const authUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&response_mode=query&scope=offline_access%20user.read%20files.readwrite.all`;

  res.redirect(authUrl);
});

// Callback route
router.get('/auth/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Authorization code is required.');
  }

  try {
    const tokenData = await getAuthenticatedClient(code);
    req.session.tokenData = tokenData;
    res.redirect('/');
  } catch (error) {
    console.error('Error getting token:', error);
    res.status(500).send('Error getting token.');
  }
});

module.exports = router;
