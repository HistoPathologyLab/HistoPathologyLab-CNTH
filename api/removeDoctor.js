const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const baseStoragePath = process.env.BASE_STORAGE_PATH || 'C:/Users/USER/OneDrive/HistoPathology Lab';
const doctorDetailsPath = path.join(baseStoragePath, 'Doctor Details');

router.delete('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required.' });
    }

    const filePath = path.join(doctorDetailsPath, `${name}.json`);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Failed to remove doctor data:', err);
            return res.status(500).json({ error: 'Failed to remove doctor data.' });
        }

        console.log(`Doctor data for ${name} removed successfully`);
        res.status(200).json({ message: `Doctor ${name} removed successfully` });
    });
});

module.exports = router;
