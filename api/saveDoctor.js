const axios = require('axios');

async function saveDoctorToOneDrive(doctor, accessToken) {
    const fileName = `${doctor.name}_${doctor.profession}.json`;
    const fileContent = JSON.stringify(doctor);

    const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${process.env.ONE_DRIVE_FOLDER_PATH}/${fileName}:/content`;

    const response = await axios.put(url, fileContent, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}

module.exports = saveDoctorToOneDrive;