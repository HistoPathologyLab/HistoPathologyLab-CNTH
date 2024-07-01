const express = require('express');
const router = express.Router();
const { getAuthenticatedClient } = require('../auth');
const { ONE_DRIVE_FOLDER_PATH } = process.env;

router.post('/', async (req, res) => {
    const { name, profession } = req.body;

    if (!name || !profession) {
        return res.status(400).json({ error: 'Name and profession are required' });
    }

    try {
        const client = await getAuthenticatedClient();
        const data = { name, profession };
        const fileName = `${name}.json`;

        await client
            .api(`${ONE_DRIVE_FOLDER_PATH}/${fileName}`)
            .put(JSON.stringify(data));

        res.json({ message: 'Doctor added successfully' });
    } catch (error) {
        console.error('Error saving doctor:', error);
        res.status(500).json({ error: 'Failed to add doctor' });
    }
});

module.exports = router;
