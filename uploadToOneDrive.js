const fs = require('fs');
const { Client } = require('@microsoft/microsoft-graph-client');
const { getAccessToken } = require('./auth');

async function uploadFileToOneDrive(data, fileName) {
  try {
    const accessToken = await getAccessToken();

    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    // Convert data to a readable stream
    const fileStream = new Readable();
    fileStream.push(data);
    fileStream.push(null);

    const uploadResponse = await client
      .api(`/me/drive/root:/${fileName}:/content`)
      .put(fileStream);

    console.log('File uploaded successfully:', uploadResponse);
  } catch (error) {
    console.error('Error uploading file to OneDrive:', error);
    throw error;
  }
}

async function removeFileFromOneDrive(fileName) {
  try {
    const accessToken = await getAccessToken();

    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    // Make API call to delete the file
    await client
      .api(`/me/drive/root:/${fileName}`)
      .delete();

    console.log('File removed successfully from OneDrive:', fileName);
  } catch (error) {
    console.error('Error removing file from OneDrive:', error);
    throw error;
  }
}

module.exports = { uploadFileToOneDrive, removeFileFromOneDrive };