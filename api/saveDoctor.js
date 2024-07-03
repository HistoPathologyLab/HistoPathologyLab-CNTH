const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const BASE_STORAGE_PATH = 'D:/HistoPathology Lab/Doctor Details';

// Ensure the base path exists
if (!fs.existsSync(BASE_STORAGE_PATH)) {
    fs.mkdirSync(BASE_STORAGE_PATH, { recursive: true });
}

router.post('/', (req, res) => {
    const { name, profession } = req.body;
    const fileName = `${BASE_STORAGE_PATH}/${name}.txt`;

    try {
        fs.writeFileSync(fileName, `Name: ${name}\nProfession: ${profession}`);
        res.status(200).json({ message: 'Doctor data saved successfully' });
    } catch (error) {
        console.error('Error saving doctor data:', error);
        res.status(500).json({ message: 'Failed to save doctor data' });
    }
});

module.exports = router;
