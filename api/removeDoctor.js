const { getAuthenticatedClient } = require('../auth');

const removeDoctor = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const client = await getAuthenticatedClient();
        const folderPath = process.env.ONE_DRIVE_FOLDER_PATH;
        const fileName = `${name.replace(/ /g, '_')}.json`;
        const filePath = `${folderPath}/${fileName}`;

        // Delete the file from OneDrive
        await client
            .api(`/me/drive/root:${filePath}`)
            .delete();

        res.status(200).json({ message: `Doctor ${name} removed successfully` });
    } catch (error) {
        console.error('Error removing doctor data:', error);
        res.status(500).json({ error: 'Failed to remove doctor data' });
    }
};

module.exports = removeDoctor;
