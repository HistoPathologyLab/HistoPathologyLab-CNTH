const fs = require('fs');
const path = require('path');

const baseStoragePath = 'C:\\Users\\USER\\OneDrive\\HistoPathology Lab\\Doctor Details';

module.exports = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required.' });
        }

        const doctorFilePath = path.join(baseStoragePath, `${name}.txt`);

        if (fs.existsSync(doctorFilePath)) {
            fs.unlinkSync(doctorFilePath);
            return res.status(200).json({ message: `Doctor ${name} removed successfully` });
        } else {
            return res.status(404).json({ message: `Doctor ${name} not found` });
        }
    } catch (error) {
        console.error('Error removing doctor data:', error);
        res.status(500).json({ message: 'Failed to remove doctor data' });
    }
};
