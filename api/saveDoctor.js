const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');
const { getAccessToken, refreshAccessToken } = require('./auth');

async function saveDoctorToOneDrive(doctor) {
    let token = await getAccessToken();

    const client = Client.init({
        authProvider: (done) => {
            done(null, token);
        },
    });

    const fileName = `${process.env.ONE_DRIVE_FOLDER_PATH}/${doctor.name}_${doctor.profession}.json`;
    const fileContent = JSON.stringify(doctor);

    try {
        await client.api(`/me/drive/root:/${fileName}:/content`).put(fileContent);
        console.log('Doctor data saved successfully to OneDrive');
    } catch (error) {
        if (error.statusCode === 401) { // If access token expired
            token = await refreshAccessToken();
            await client.api(`/me/drive/root:/${fileName}:/content`).put(fileContent);
            console.log('Doctor data saved successfully to OneDrive after refreshing token');
        } else {
            console.error('Error saving doctor data to OneDrive:', error);
            throw new Error('Failed to save doctor data');
        }
    }
}

module.exports = saveDoctorToOneDrive;