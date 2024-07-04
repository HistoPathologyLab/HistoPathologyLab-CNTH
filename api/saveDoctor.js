const axios = require('axios');

module.exports = async (req, res) => {
    const { name, profession } = req.body;
    if (!name || !profession) {
        return res.status(400).json({ message: 'Name and profession are required' });
    }

    const fileName = `${name.replace(/\s+/g, '_')}_${profession.replace(/\s+/g, '_')}.txt`;
    const fileContent = JSON.stringify({ name, profession });

    try {
        const response = await axios.put(
            `https://graph.microsoft.com/v1.0/me/drive/root:/Doctor Details/${fileName}:/content`,
            fileContent,
            {
                headers: {
                    'Authorization': `Bearer ${req.user.accessToken}`,
                    'Content-Type': 'text/plain'
                }
            }
        );

        if (response.status === 201 || response.status === 200) {
            res.status(200).json({ message: 'Doctor data saved successfully' });
        } else {
            throw new Error('Failed to save doctor data.');
        }
    } catch (error) {
        console.error('Error saving doctor data:', error);
        res.status(500).json({ message: 'Error saving doctor data' });
    }
};
