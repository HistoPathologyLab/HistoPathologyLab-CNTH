const fs = require('fs');
const path = require('path');

module.exports = function(basePath) {
    return async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const doctorDetailsPath = path.join(basePath, 'Doctor Details');
        const filePath = path.join(doctorDetailsPath, `${name}.txt`);

        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                res.json({ message: `Doctor ${name} removed.` });
            } else {
                res.status(404).json({ message: `Doctor ${name} not found.` });
            }
        } catch (error) {
            console.error('Error removing doctor data:', error);
            res.status(500).json({ message: 'Failed to remove doctor data' });
        }
    };
};
