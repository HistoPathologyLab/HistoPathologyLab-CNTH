const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');
const getAccessToken = require('./auth');

async function saveDoctorToOneDrive(doctor) {
    try {
        const accessToken = await getAccessToken();
        console.log("Access token in saveDoctorToOneDrive:", accessToken);

        const client = Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            },
        });

        const fileName = `${process.env.ONE_DRIVE_FOLDER_PATH}/${doctor.name}_${doctor.profession}.json`;
        const fileContent = JSON.stringify(doctor);

        await client.api(`/me/drive/root:/${fileName}:/content`).put(fileContent);
        console.log('Doctor data saved successfully to OneDrive');
    } catch (error) {
        console.error('Error saving doctor data to OneDrive:', error);
        throw new Error('Failed to save doctor data');
    }
}

module.exports = saveDoctorToOneDrive;