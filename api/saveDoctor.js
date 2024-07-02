const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    try {
        const basePath = process.env.BASE_STORAGE_PATH || 'C:/Users/USER/OneDrive/HistoPathology Lab';
        const doctorDetailsPath = path.join(basePath, 'Doctor Details');

        console.log(`Base path: ${basePath}`);
        console.log(`Doctor details path: ${doctorDetailsPath}`);

        const { name, profession } = req.body;

        if (!name || !profession) {
            console.error('Name or profession missing in request body');
            return res.status(400).json({ message: 'Name and profession are required' });
        }

        const filePath = path.join(doctorDetailsPath, `${name}.txt`);

        console.log(`Saving doctor data to: ${filePath}`);

        const doctorData = `Name: ${name}\nProfession: ${profession}\n`;
        fs.writeFileSync(filePath, doctorData);

        console.log('Doctor data saved successfully');

        return res.status(200).json({ message: 'Doctor data saved successfully' });
    } catch (error) {
        console.error('Error saving doctor data:', error);
        return res.status(500).json({ message: 'Failed to save doctor data' });
    }
};
