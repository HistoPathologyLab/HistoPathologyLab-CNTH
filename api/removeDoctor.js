const axios = require('axios');

async function removeDoctorFromOneDrive(fileName, accessToken) {
    const url = `https://graph.microsoft.com/v1.0/me/drive/root:${fileName}`;

    try {
        await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch (error) {
        console.error('Error removing doctor from OneDrive:', error);
        throw error;
    }
}

module.exports = removeDoctorFromOneDrive;