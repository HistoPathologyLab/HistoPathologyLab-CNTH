const fs = require('fs');
const path = require('path');

const doctorDetailsDir = path.join("D:/HistoPathology Lab", "Doctor Details");

if (!fs.existsSync(doctorDetailsDir)) {
    fs.mkdirSync(doctorDetailsDir, { recursive: true });
}

module.exports = (req, res) => {
    const { name, profession } = req.body;
    if (!name || !profession) {
        return res.status(400).json({ message: 'Name and profession are required' });
    }

    const fileName = `${name.replace(/\s+/g, '_')}_${profession.replace(/\s+/g, '_')}.txt`;
    const filePath = path.join(doctorDetailsDir, fileName);

    fs.writeFile(filePath, JSON.stringify({ name, profession }), (err) => {
        if (err) {
            console.error('Error saving doctor data:', err);
            return res.status(500).json({ message: 'Error saving doctor data' });
        }
        res.status(200).json({ message: 'Doctor data saved successfully' });
    });
};
