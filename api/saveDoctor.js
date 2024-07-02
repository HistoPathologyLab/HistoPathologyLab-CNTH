const fs = require('fs');
const path = require('path');

const baseStoragePath = process.env.BASE_STORAGE_PATH;

const saveDoctor = async (req, res) => {
    const { name, profession } = req.body;

    if (!name || !profession) {
        return res.status(400).json({ message: 'Name and profession are required' });
    }

    const doctorDetailsPath = path.join(baseStoragePath, 'Doctor Details');

    // Ensure the Doctor Details directory exists
    if (!fs.existsSync(doctorDetailsPath)) {
        fs.mkdirSync(doctorDetailsPath, { recursive: true });
    }

    const filePath = path.join(doctorDetailsPath, `${name.replace(/\s+/g, '_')}.txt`);
    const fileContent = `Name: ${name}\nProfession: ${profession}`;

    try {
        fs.writeFileSync(filePath, fileContent);
        res.status(200).json({ message: 'Doctor data saved successfully' });
    } catch (error) {
        console.error('Error saving doctor data:', error);
        res.status(500).json({ message: 'Failed to save doctor data' });
    }
};

module.exports = saveDoctor;
