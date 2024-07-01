const express = require('express');
const router = express.Router();
const { getAuthenticatedClient } = require('../auth');
const fetch = require('node-fetch');

router.post('/', async (req, res) => {
    const { name, profession } = req.body;
    const accessToken = getAuthenticatedClient();
    const oneDriveFolderPath = process.env.ONE_DRIVE_FOLDER_PATH;

    const url = `https://graph.microsoft.com/v1.0/me/drive/root:${oneDriveFolderPath}/${name}.json:/content`;

    const body = JSON.stringify({ name, profession });

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: body
        });

        if (response.ok) {
            res.status(200).send('Doctor data saved successfully');
        } else {
            throw new Error('Failed to save doctor data');
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to save doctor data' });
    }
});

module.exports = router;
