const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const saveDoctor = require('./saveDoctor');
const removeDoctor = require('./removeDoctor');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Save doctor route
app.post('/api/saveDoctor', (req, res) => {
    const { name, profession } = req.body;
    saveDoctor(name, profession);
    res.sendStatus(200);
});

// Remove doctor route
app.delete('/api/removeDoctor', (req, res) => {
    const { name, profession } = req.body;
    removeDoctor(name, profession);
    res.sendStatus(200);
});

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
