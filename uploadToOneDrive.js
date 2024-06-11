const fs = require('fs');
const { Client } = require('@microsoft/microsoft-graph-client');
const { getAccessToken } = require('./auth');

async function uploadFileToOneDrive(filePath, fileName) {
  try {
    const accessToken = await getAccessToken();

    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    const fileStream = fs.createReadStream(filePath);

    const uploadResponse = await client
      .api(`/me/drive/root:/${fileName}:/content`)
      .put(fileStream);

    console.log('File uploaded successfully:', uploadResponse);
  } catch (error) {
    console.error('Error uploading file to OneDrive:', error);
    throw error;
  }
}

// Example usage:
// uploadFileToOneDrive('path/to/your/file.txt', 'file.txt').catch((error) => console.error(error));

module.exports = { uploadFileToOneDrive };