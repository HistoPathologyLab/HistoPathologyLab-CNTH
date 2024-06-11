const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 by default

// Middleware to parse JSON requests
app.use(express.json());

// Define a route to handle POST requests
app.post('/api/doctors', (req, res) => {
    const { name, profession } = req.body;

    // Here you can implement code to store the data in OneDrive
    // For now, let's just log the received data
    console.log('Received data:', { name, profession });

    res.status(200).json({ message: 'Data received successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});