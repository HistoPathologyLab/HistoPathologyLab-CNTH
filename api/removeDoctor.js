const express = require('express');
const router = express.Router();
const { getAuthenticatedClient } = require('../auth');
const fetch = require('node-fetch');

router.delete('/', async (req, res) => {
    const { name } = req.body;
    const accessToken = getAuthenticatedClient();
    const oneDriveFolderPath = process.env.ONE_DRIVE_FOLDER_PATH;

    const url = `https://graph.microsoft.com/v1.0/me/drive/root:${oneDriveFolderPath}/${name}.json`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            res.status(200).send('Doctor data removed successfully');
        } else {
            throw new Error('Failed to remove doctor data');
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to remove doctor data' });
    }
});

module.exports = router;
