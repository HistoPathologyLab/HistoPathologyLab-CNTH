const express = require('express');
const cors = require('cors'); // Import the CORS package
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const doctorsFilePath = path.join(__dirname, 'D:/HistoPathology Lab/Doctor Details/doctors.json');

app.post('/api/doctors', (req, res) => {
    const { name, profession } = req.body;
    const doctorData = { name, profession };

    fs.readFile(doctorsFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let doctors = [];
        if (data) {
            doctors = JSON.parse(data);
        }

        doctors.push(doctorData);

        fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Failed to save doctor data' });
            }

            res.status(201).json({ message: 'Doctor data saved successfully' });
        });
    });
});

app.delete('/api/doctors', (req, res) => {
    const { name } = req.body;

    fs.readFile(doctorsFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let doctors = [];
        if (data) {
            doctors = JSON.parse(data);
        }

        const updatedDoctors = doctors.filter(doctor => doctor.name !== name);

        fs.writeFile(doctorsFilePath, JSON.stringify(updatedDoctors, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Failed to delete doctor data' });
            }

            res.status(200).json({ message: 'Doctor data deleted successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});