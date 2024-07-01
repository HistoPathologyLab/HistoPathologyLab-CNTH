const { getAuthenticatedClient } = require('../auth');

const saveDoctor = async (req, res) => {
    const { name, profession } = req.body;

    if (!name || !profession) {
        return res.status(400).json({ error: 'Name and profession are required' });
    }

    const doctorData = {
        name,
        profession
    };

    try {
        const client = await getAuthenticatedClient();
        const folderPath = process.env.ONE_DRIVE_FOLDER_PATH;
        const fileName = `${name.replace(/ /g, '_')}.json`;
        const filePath = `${folderPath}/${fileName}`;

        // Prepare the content
        const fileContent = JSON.stringify(doctorData, null, 2);

        // Upload the file to OneDrive
        await client
            .api(`/me/drive/root:${filePath}:/content`)
            .put(fileContent);

        res.status(200).json({ message: 'Doctor data saved successfully' });
    } catch (error) {
        console.error('Error saving doctor data:', error);
        res.status(500).json({ error: 'Failed to save doctor data' });
    }
};

module.exports = saveDoctor;
