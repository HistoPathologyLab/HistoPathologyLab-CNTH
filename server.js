const express = require('express');
const { uploadFileToOneDrive, removeFileFromOneDrive } = require('./uploadToOneDrive');
const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 by default

// Middleware to parse JSON requests
app.use(express.json());

// Define a route to handle POST requests
app.post('/api/doctors', async (req, res) => {
    const { name, profession } = req.body;
    const fileName = `HistoPathology Lab/Doctors/${name}.txt`;

    try {
        // Save the doctor data to OneDrive
        await uploadFileToOneDrive(`Name: ${name}\nProfession: ${profession}`, fileName);
        res.status(200).json({ message: 'Data received and saved successfully' });
    } catch (error) {
        console.error('Error saving data to OneDrive:', error);
        res.status(500).json({ message: 'Error saving data to OneDrive' });
    }
});

// Define a route to handle DELETE requests
app.delete('/api/doctors', async (req, res) => {
    const { name } = req.body;
    const fileName = `HistoPathology Lab/Doctors/${name}.txt`;

    try {
        // Remove the doctor data from OneDrive
        await removeFileFromOneDrive(fileName);
        res.status(200).json({ message: 'Data removed successfully' });
    } catch (error) {
        console.error('Error removing data from OneDrive:', error);
        res.status(500).json({ message: 'Error removing data from OneDrive' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});