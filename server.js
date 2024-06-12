const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const doctorsFilePath = path.join('D:/HistoPathology Lab/Doctor Details', 'doctors.json');

app.post('/api/doctors', (req, res) => {
    const { name, profession } = req.body;
    const doctorData = { name, profession };

    console.log('Received POST request:', doctorData);

    fs.readFile(doctorsFilePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.warn('File not found, creating a new one.');
            } else {
                console.error('Error reading file:', err);
                return res.status(500).json({ error: 'Failed to read data file' });
            }
        }

        let doctors = [];
        if (data) {
            try {
                doctors = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                return res.status(500).json({ error: 'Failed to parse data file' });
            }
        }

        doctors.push(doctorData);

        fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Failed to save doctor data' });
            }

            console.log('Doctor data saved successfully');
            res.status(201).json({ message: 'Doctor data saved successfully' });
        });
    });
});

app.delete('/api/doctors', (req, res) => {
    const { name } = req.body;

    console.log('Received DELETE request:', { name });

    fs.readFile(doctorsFilePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.warn('File not found.');
            } else {
                console.error('Error reading file:', err);
                return res.status(500).json({ error: 'Failed to read data file' });
            }
        }

        let doctors = [];
        if (data) {
            try {
                doctors = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                return res.status(500).json({ error: 'Failed to parse data file' });
            }
        }

        const updatedDoctors = doctors.filter(doctor => doctor.name !== name);

        fs.writeFile(doctorsFilePath, JSON.stringify(updatedDoctors, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Failed to delete doctor data' });
            }

            console.log('Doctor data deleted successfully');
            res.status(200).json({ message: 'Doctor data deleted successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});