const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const baseStoragePath = process.env.BASE_STORAGE_PATH || 'C:/Users/USER/OneDrive/HistoPathology Lab';
const doctorDetailsPath = path.join(baseStoragePath, 'Doctor Details');

router.post('/', (req, res) => {
    const { name, profession } = req.body;

    if (!name || !profession) {
        return res.status(400).json({ error: 'Name and profession are required.' });
    }

    const doctorData = { name, profession };
    const filePath = path.join(doctorDetailsPath, `${name}.json`);

    fs.writeFile(filePath, JSON.stringify(doctorData, null, 2), (err) => {
        if (err) {
            console.error('Failed to save doctor data:', err);
            return res.status(500).json({ error: 'Failed to save doctor data.' });
        }

        console.log('Doctor data saved successfully:', doctorData);
        res.status(200).json({ message: 'Doctor data saved successfully' });
    });
});

module.exports = router;
