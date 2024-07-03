const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'sF2r9rcJSWPzq4BT',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Function to ensure directories exist
function ensureDirectoriesExist(basePath) {
    const doctorDetailsPath = path.join(basePath, 'Doctor Details');
    if (!fs.existsSync(doctorDetailsPath)) {
        fs.mkdirSync(doctorDetailsPath, { recursive: true });
    }
}

// Determine base path
const basePath = 'D:/HistoPathology Lab';
ensureDirectoriesExist(basePath);

// Routes
app.use('/api/doctors', require('./api/saveDoctor')(basePath));
app.use('/api/doctors', require('./api/removeDoctor')(basePath));

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
