const { getAccessToken } = require('./getAccessToken');

async function verifyToken() {
    const token = await getAccessToken();
    console.log(`Access token from verifyToken.js: ${token}`);
}

verifyToken();
