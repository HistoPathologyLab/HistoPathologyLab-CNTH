const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const doctorsFilePath = path.join('D:/HistoPathologyLab-CNTH/Doctor Details', 'doctors.json');

// Ensure the directory exists
const directoryPath = path.dirname(doctorsFilePath);
if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
}

// Ensure the file exists
if (!fs.existsSync(doctorsFilePath)) {
    fs.writeFileSync(doctorsFilePath, '[]', 'utf8');
}

app.post('/api/doctors', (req, res) => {
    const { name, profession } = req.body;
    const doctorData = { name, profession };

    console.log('Received POST request:', doctorData);

    fs.readFile(doctorsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Failed to read data file', details: err.message });
        }

        let doctors = [];
        if (data) {
            try {
                doctors = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                return res.status(500).json({ error: 'Failed to parse data file', details: parseErr.message });
            }
        }

        doctors.push(doctorData);

        fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Failed to save doctor data', details: err.message });
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
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Failed to read data file', details: err.message });
        }

        let doctors = [];
        if (data) {
            try {
                doctors = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                return res.status(500).json({ error: 'Failed to parse data file', details: parseErr.message });
            }
        }

        const updatedDoctors = doctors.filter(doctor => doctor.name !== name);

        fs.writeFile(doctorsFilePath, JSON.stringify(updatedDoctors, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Failed to delete doctor data', details: err.message });
            }

            console.log('Doctor data deleted successfully');
            res.status(200).json({ message: 'Doctor data deleted successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});