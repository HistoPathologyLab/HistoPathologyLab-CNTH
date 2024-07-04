const axios = require('axios');

module.exports = async (req, res) => {
    const { name, profession } = req.body;
    if (!name || !profession) {
        return res.status(400).json({ message: 'Name and profession are required' });
    }

    const fileName = `${name.replace(/\s+/g, '_')}_${profession.replace(/\s+/g, '_')}.txt`;

    try {
        const response = await axios.delete(
            `https://graph.microsoft.com/v1.0/me/drive/root:/Doctor Details/${fileName}`,
            {
                headers: {
                    'Authorization': `Bearer ${req.user.accessToken}`
                }
            }
        );

        if (response.status === 204) {
            res.status(200).json({ message: 'Doctor data removed successfully' });
        } else {
            throw new Error('Failed to remove doctor data.');
        }
    } catch (error) {
        console.error('Error removing doctor data:', error);
        res.status(500).json({ message: 'Error removing doctor data' });
    }
};
