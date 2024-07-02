const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Load API routes
const saveDoctor = require('./api/saveDoctor');
const removeDoctor = require('./api/removeDoctor');

app.post('/api/doctors', saveDoctor);
app.delete('/api/doctors', removeDoctor);

// Serve HTML file for addregistrarconsultant.html
app.get('/addregistrarconsultant.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addregistrarconsultant.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
