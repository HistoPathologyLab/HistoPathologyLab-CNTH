const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to save doctor data
app.post('/api/doctors', (req, res) => {
    const { name, profession } = req.body;
    const doctorDetailsPath = path.join('C:/Users/USER/OneDrive/HistoPathology Lab/Doctor Details', `${name}.json`);
    
    const doctorData = { name, profession };
    
    fs.writeFile(doctorDetailsPath, JSON.stringify(doctorData, null, 2), (err) => {
        if (err) {
            console.error('Failed to save doctor data:', err);
            res.status(500).json({ error: 'Failed to save doctor data.' });
        } else {
            console.log('Doctor data saved successfully:', doctorData);
            res.status(200).json({ message: 'Doctor data saved successfully.' });
        }
    });
});

// Endpoint to remove doctor data
app.delete('/api/doctors', (req, res) => {
    const { name } = req.body;
    const doctorDetailsPath = path.join('C:/Users/USER/OneDrive/HistoPathology Lab/Doctor Details', `${name}.json`);
    
    fs.unlink(doctorDetailsPath, (err) => {
        if (err) {
            console.error('Failed to remove doctor data:', err);
            res.status(500).json({ error: 'Failed to remove doctor data.' });
        } else {
            console.log('Doctor data removed successfully:', name);
            res.status(200).json({ message: 'Doctor data removed successfully.' });
        }
    });
});

// Serve static files (if you have a front-end)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
