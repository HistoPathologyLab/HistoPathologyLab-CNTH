const fs = require('fs');
const path = require('path');

const basePath = 'C:\\Users\\USER\\OneDrive\\HistoPathology Lab';
const doctorDetailsPath = path.join(basePath, 'Doctor Details');

const removeDoctor = async (req, res) => {
    const { name } = req.body;
    const filePath = path.join(doctorDetailsPath, `${name}.txt`);

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.status(200).json({ message: 'Doctor data removed successfully' });
        } else {
            res.status(404).json({ message: 'Doctor data not found' });
        }
    } catch (error) {
        console.error('Error removing doctor data:', error);
        res.status(500).json({ message: 'Failed to remove doctor data' });
    }
};

module.exports = removeDoctor;
