const fs = require('fs');
const path = require('path');

const doctorDetailsDir = path.join("D:/HistoPathology Lab", "Doctor Details");

module.exports = (req, res) => {
    const { name, profession } = req.body;
    if (!name || !profession) {
        return res.status(400).json({ message: 'Name and profession are required' });
    }

    const fileName = `${name}_${profession}.txt`;
    const filePath = path.join(doctorDetailsDir, fileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error removing doctor data:', err);
            return res.status(500).json({ message: 'Error removing doctor data' });
        }
        res.status(200).json({ message: 'Doctor data removed successfully' });
    });
};
