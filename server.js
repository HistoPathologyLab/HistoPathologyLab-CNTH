const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const doctorDetailsPath = "D:\\HistoPathology Lab\\Doctor Details";

// Middleware to parse JSON requests
app.use(express.json());

// Ensure the directory exists
if (!fs.existsSync(doctorDetailsPath)){
    fs.mkdirSync(doctorDetailsPath, { recursive: true });
}

// Route to handle POST requests for saving doctor details
app.post('/api/doctors', (req, res) => {
    const { name, profession } = req.body;

    if (!name || !profession) {
        return res.status(400).json({ message: 'Name and profession are required.' });
    }

    const filePath = path.join(doctorDetailsPath, `${name}.json`);
    const data = { name, profession };

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).json({ message: 'Failed to save doctor data.' });
        }
        res.status(200).json({ message: 'Doctor data saved successfully.' });
    });
});

// Route to handle DELETE requests for removing doctor details
app.delete('/api/doctors', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required.' });
    }

    const filePath = path.join(doctorDetailsPath, `${name}.json`);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).json({ message: 'Failed to remove doctor data.' });
        }
        res.status(200).json({ message: 'Doctor data removed successfully.' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});