const fs = require('fs');
const path = require('path');

const baseStoragePath = 'C:\\Users\\USER\\OneDrive\\HistoPathology Lab\\Doctor Details';

module.exports = async (req, res) => {
    try {
        const { name, profession } = req.body;

        if (!name || !profession) {
            return res.status(400).json({ message: 'Name and profession are required.' });
        }

        const doctorData = `Name: ${name}, Profession: ${profession}`;
        const doctorFilePath = path.join(baseStoragePath, `${name}.txt`);

        if (!fs.existsSync(baseStoragePath)) {
            fs.mkdirSync(baseStoragePath, { recursive: true });
        }

        fs.writeFileSync(doctorFilePath, doctorData);

        res.status(200).json({ message: 'Doctor data saved successfully' });
    } catch (error) {
        console.error('Error saving doctor data:', error);
        res.status(500).json({ message: 'Failed to save doctor data' });
    }
};
