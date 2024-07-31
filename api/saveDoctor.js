const express = require('express');
const fs = require('fs');
const path = require('path');
const getAccessToken = require('./getAccessToken'); // Ensure this path is correct
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/api/saveDoctor', async (req, res) => {
  const doctorName = req.body.name;
  const doctorProfession = req.body.profession;

  try {
    const accessToken = await getAccessToken();

    console.log("Access Token in saveDoctor:", accessToken);

    if (!accessToken) {
      throw new Error("Failed to obtain access token");
    }

    const response = await axios.put(
      `https://graph.microsoft.com/v1.0/me/drive/root:/HistoPathology Lab/Doctor Details/${doctorName}.txt:/content`,
      `Name: ${doctorName}\nProfession: ${doctorProfession}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'text/plain',
        },
      }
    );

    console.log("Response from Graph API:", response.data);

    res.status(200).send('Doctor data saved successfully.');
  } catch (error) {
    console.error("Error saving doctor data:", error.response ? error.response.data : error.message);
    res.status(500).send('Failed to save doctor data.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
