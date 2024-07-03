const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const { name, profession } = req.body;

    if (!name || !profession) {
        return res.status(400).json({ message: 'Name and profession are required.' });
    }

    const baseDir = 'D:/HistoPathology Lab/Doctor Details';
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
    }

    const filePath = path.join(baseDir, `${name}.txt`);
    const data = `Name: ${name}\nProfession: ${profession}`;

    try {
        fs.writeFileSync(filePath, data, 'utf8');
        res.status(200).json({ message: 'Doctor data saved successfully' });
    } catch (error) {
        console.error('Error saving doctor data:', error);
        res.status(500).json({ message: 'Failed to save doctor data' });
    }
};
