const fs = require('fs');
const path = require('path');

const baseStoragePath = process.env.BASE_STORAGE_PATH;

const removeDoctor = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const doctorDetailsPath = path.join(baseStoragePath, 'Doctor Details');
    const filePath = path.join(doctorDetailsPath, `${name.replace(/\s+/g, '_')}.txt`);

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.status(200).json({ message: `Doctor ${name} removed.` });
        } else {
            res.status(404).json({ message: `Doctor ${name} not found.` });
        }
    } catch (error) {
        console.error('Error removing doctor data:', error);
        res.status(500).json({ message: 'Failed to remove doctor data' });
    }
};

module.exports = removeDoctor;
