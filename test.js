const fs = require('fs');
const path = require('path');

const doctorsFilePath = path.join('D:/HistoPathology Lab/Doctor Details', 'doctors.json');
const doctorData = { name: 'Test Doctor', profession: 'Test Profession' };

fs.readFile(doctorsFilePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
        return console.error('Error reading file:', err);
    }

    let doctors = [];
    if (data) {
        try {
            doctors = JSON.parse(data);
        } catch (parseErr) {
            return console.error('Error parsing JSON:', parseErr);
        }
    }

    doctors.push(doctorData);

    fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
        if (err) {
            return console.error('Error writing file:', err);
        }

        console.log('Doctor data saved successfully');
    });
});