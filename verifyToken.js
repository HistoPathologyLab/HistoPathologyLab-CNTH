const { getAccessToken } = require('./getAccessToken');

(async () => {
  try {
    const token = await getAccessToken();
    console.log('Access Token:', token);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
