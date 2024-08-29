const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const saveDoctor = require('./api/saveDoctor');
const removeDoctor = require('./api/removeDoctor');

app.post('/api/saveDoctor', saveDoctor);
app.post('/api/removeDoctor', removeDoctor);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
