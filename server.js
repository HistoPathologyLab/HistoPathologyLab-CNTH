const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const saveDoctor = require('./api/saveDoctor'); // Adjust this path if necessary
const removeDoctor = require('./api/removeDoctor'); // Adjust this path if necessary

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/saveDoctor', saveDoctor);
app.post('/api/removeDoctor', removeDoctor);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/addregistrarConsultant.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addregistrarConsultant.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
