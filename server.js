const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/api/saveDoctor', require('./saveDoctor'));
app.delete('/api/removeDoctor', require('./removeDoctor'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname)));

// Serve the HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'addregistrarConsultant.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
