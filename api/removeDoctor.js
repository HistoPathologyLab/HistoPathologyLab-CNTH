const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

async function removeDoctorFromOneDrive(fileName, accessToken) {
    const client = Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        },
    });

    try {
        await client.api(`/me/drive/root:/${fileName}`).delete();
        console.log('Doctor data removed successfully from OneDrive');
    } catch (error) {
        console.error('Error removing doctor data from OneDrive:', error);
        throw new Error('Failed to remove doctor data');
    }
}

module.exports = removeDoctorFromOneDrive;