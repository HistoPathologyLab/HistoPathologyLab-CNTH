const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/api/saveDoctor', require('./api/saveDoctor'));
app.delete('/api/removeDoctor', require('./api/removeDoctor'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/addregistrarConsultant.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addregistrarConsultant.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
