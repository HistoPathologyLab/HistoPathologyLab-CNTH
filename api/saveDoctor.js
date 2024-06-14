const { Client } = require('@microsoft/microsoft-graph-client');
const { getAccessToken } = require('./auth');

async function uploadFileToOneDrive(data, fileName) {
  const accessToken = await getAccessToken();

  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  const folderPath = `HistoPathology Lab/Doctor Details`;
  try {
    await client
      .api(`/me/drive/root:/${folderPath}`)
      .get();
  } catch (error) {
    if (error.code === 'itemNotFound') {
      await client
        .api(`/me/drive/root/children`)
        .post({ name: 'HistoPathology Lab', folder: {}, '@microsoft.graph.conflictBehavior': 'rename' });
      await client
        .api(`/me/drive/root:/HistoPathology Lab/children`)
        .post({ name: 'Doctor Details', folder: {}, '@microsoft.graph.conflictBehavior': 'rename' });
    } else {
      throw error;
    }
  }

  const uploadResponse = await client
    .api(`/me/drive/root:/${fileName}:/content`)
    .put(data);
  return uploadResponse;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, profession } = req.body;

  try {
    const fileName = `HistoPathology Lab/Doctor Details/${name}_${profession}.json`;
    const data = JSON.stringify({ name, profession });

    await uploadFileToOneDrive(data, fileName);

    res.status(200).json({ message: 'Doctor data saved successfully' });
  } catch (error) {
    console.error('Error saving doctor data to OneDrive:', error);
    res.status(500).json({ error: 'Failed to save doctor data' });
  }
};