const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/doctors', (req, res) => {
    const { name, profession } = req.body;
    const doctorsFilePath = path.join('C:/Users/USER/OneDrive/HistoPathology Lab/Doctor Details', 'doctors.json');

    fs.readFile(doctorsFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ error: 'Failed to read doctor data.' });
        }

        const doctors = data ? JSON.parse(data) : [];
        doctors.push({ name, profession });

        fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save doctor data.' });
            }

            res.status(200).json({ message: 'Doctor data saved successfully.' });
        });
    });
});

app.delete('/api/doctors', (req, res) => {
    const { name } = req.body;
    const doctorsFilePath = path.join('C:/Users/USER/OneDrive/HistoPathology Lab/Doctor Details', 'doctors.json');

    fs.readFile(doctorsFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ error: 'Failed to read doctor data.' });
        }

        let doctors = data ? JSON.parse(data) : [];
        doctors = doctors.filter(doctor => doctor.name !== name);

        fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to remove doctor data.' });
            }

            res.status(200).json({ message: 'Doctor data removed successfully.' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
