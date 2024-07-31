const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const getAccessToken = require('./getAccessToken');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Test endpoint to trigger getAccessToken
app.get('/test-token', async (req, res) => {
  try {
    const token = await getAccessToken();
    console.log("Access Token:", token);
    res.send(`Access Token: ${token}`);
  } catch (error) {
    console.error("Error getting access token:", error);
    res.status(500).send("Error getting access token");
  }
});

// Endpoint to save doctor data
app.post('/api/saveDoctor', async (req, res) => {
  const { name, profession } = req.body;

  try {
    const token = await getAccessToken();
    console.log("Access Token in saveDoctor:", token);

    const response = await axios.put(
      `https://graph.microsoft.com/v1.0/me/drive/root:/HistoPathology Lab/Doctor Details/${name}.txt:/content`,
      `Name: ${name}\nProfession: ${profession}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain'
        }
      }
    );

    res.send('Doctor data saved successfully');
  } catch (error) {
    console.error("Error saving doctor data:", error.response ? error.response.data : error.message);
    res.status(500).send("Error saving doctor data");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
