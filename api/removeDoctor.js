const axios = require('axios');

async function removeDoctorFromOneDrive(fileName, accessToken) {
    const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${fileName}`;

    await axios.delete(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
}

module.exports = removeDoctorFromOneDrive;