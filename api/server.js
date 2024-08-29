const getAccessToken = require('./getAccessToken'); // Correct path to getAccessToken.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Correct the paths for saveDoctor and removeDoctor
const saveDoctor = require('./saveDoctor');
const removeDoctor = require('./removeDoctor');

app.post('/api/saveDoctor', saveDoctor);
app.post('/api/removeDoctor', removeDoctor);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
