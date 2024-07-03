const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const BASE_STORAGE_PATH = 'D:/HistoPathology Lab/Doctor Details';

router.delete('/', (req, res) => {
    const { name } = req.body;
    const fileName = `${BASE_STORAGE_PATH}/${name}.txt`;

    try {
        if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
            res.status(200).json({ message: 'Doctor data removed successfully' });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        console.error('Error removing doctor data:', error);
        res.status(500).json({ message: 'Failed to remove doctor data' });
    }
});

module.exports = router;
