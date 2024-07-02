const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.delete('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const doctorsDir = path.join('C:/Users/USER/OneDrive/HistoPathology Lab/Doctor Details');
    const filePath = path.join(doctorsDir, `${name}.txt`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Doctor not found' });
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error removing doctor data:', err);
            return res.status(500).json({ error: 'Failed to remove doctor data' });
        }
        res.json({ message: 'Doctor data removed successfully' });
    });
});

module.exports = router;
