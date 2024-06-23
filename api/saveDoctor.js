const axios = require('axios');

async function saveDoctorToOneDrive(doctor, accessToken) {
    const folderPath = process.env.ONE_DRIVE_FOLDER_PATH;
    const fileName = `${doctor.name}_${doctor.profession}.json`;
    const fileContent = JSON.stringify(doctor);

    const url = `https://graph.microsoft.com/v1.0/me/drive/root:${folderPath}/${fileName}:/content`;

    try {
        const response = await axios.put(url, fileContent, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error saving doctor to OneDrive:', error);
        throw error;
    }
}

module.exports = saveDoctorToOneDrive;