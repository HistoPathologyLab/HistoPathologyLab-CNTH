const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const axios = require('axios');
const qs = require('querystring');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/auth', (req, res) => {
    const params = {
        client_id: process.env.CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.REDIRECT_URI,
        response_mode: 'query',
        scope: 'user.read files.readwrite.all',
        state: '12345'
    };
    const authUrl = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/authorize?${qs.stringify(params)}`;
    res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
    const code = req.query.code;

    const tokenParams = {
        client_id: process.env.CLIENT_ID,
        scope: 'user.read files.readwrite.all',
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
        client_secret: process.env.CLIENT_SECRET
    };

    try {
        const response = await axios.post(
            `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
            qs.stringify(tokenParams),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        req.session.accessToken = response.data.access_token;
        res.redirect('/');
    } catch (error) {
        console.error('Error getting tokens:', error);
        res.status(500).send('Authentication error');
    }
});

app.use((req, res, next) => {
    if (!req.session.accessToken && req.path !== '/auth/callback' && !req.path.startsWith('/auth')) {
        return res.redirect('/auth');
    }
    next();
});

// Routes
app.post('/api/saveDoctor', require('./api/saveDoctor'));
app.delete('/api/removeDoctor', require('./api/removeDoctor'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/addregistrarConsultant.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addregistrarConsultant.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
