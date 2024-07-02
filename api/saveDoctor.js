const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', (req, res) => {
    const { name, profession } = req.body;

    if (!name || !profession) {
        return res.status(400).json({ error: 'Name and profession are required' });
    }

    const doctorsDir = path.join('C:/Users/USER/OneDrive/HistoPathology Lab/Doctor Details');

    if (!fs.existsSync(doctorsDir)) {
        fs.mkdirSync(doctorsDir, { recursive: true });
    }

    const filePath = path.join(doctorsDir, `${name}.txt`);
    const content = `Name: ${name}\nProfession: ${profession}`;

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error saving doctor data:', err);
            return res.status(500).json({ error: 'Failed to save doctor data' });
        }
        res.json({ message: 'Doctor data saved successfully' });
    });
});

module.exports = router;
