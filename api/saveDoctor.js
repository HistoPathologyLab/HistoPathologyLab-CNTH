const fs = require('fs');
const path = require('path');

const basePath = 'C:\\Users\\USER\\OneDrive\\HistoPathology Lab';
const doctorDetailsPath = path.join(basePath, 'Doctor Details');

// Ensure the Doctor Details directory exists
if (!fs.existsSync(doctorDetailsPath)) {
    fs.mkdirSync(doctorDetailsPath, { recursive: true });
}

const saveDoctor = async (req, res) => {
    const { name, profession } = req.body;
    const filePath = path.join(doctorDetailsPath, `${name}.txt`);

    try {
        fs.writeFileSync(filePath, `Name: ${name}\nProfession: ${profession}`);
        res.status(200).json({ message: 'Doctor data saved successfully' });
    } catch (error) {
        console.error('Error saving doctor data:', error);
        res.status(500).json({ message: 'Failed to save doctor data' });
    }
};

module.exports = saveDoctor;
