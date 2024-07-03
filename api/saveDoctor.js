const fs = require('fs');
const path = require('path');

module.exports = function(basePath) {
    return async (req, res) => {
        const { name, profession } = req.body;

        if (!name || !profession) {
            return res.status(400).json({ message: 'Name and profession are required' });
        }

        const doctorDetailsPath = path.join(basePath, 'Doctor Details');
        const filePath = path.join(doctorDetailsPath, `${name}.txt`);

        try {
            fs.writeFileSync(filePath, `Name: ${name}\nProfession: ${profession}`);
            res.json({ message: 'Doctor data saved successfully' });
        } catch (error) {
            console.error('Error saving doctor data:', error);
            res.status(500).json({ message: 'Failed to save doctor data' });
        }
    };
};
