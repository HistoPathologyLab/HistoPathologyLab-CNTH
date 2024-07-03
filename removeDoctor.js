const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required.' });
    }

    const baseDir = 'D:/HistoPathology Lab/Doctor Details';
    const filePath = path.join(baseDir, `${name}.txt`);

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.status(200).json({ message: 'Doctor data removed successfully' });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        console.error('Error removing doctor data:', error);
        res.status(500).json({ message: 'Failed to remove doctor data' });
    }
};
