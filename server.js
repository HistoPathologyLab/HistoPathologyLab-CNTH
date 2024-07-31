const express = require('express');
const getAccessToken = require('./getAccessToken');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test-token', async (req, res) => {
    try {
        const token = await getAccessToken();
        res.send(`Access Token: ${token}`);
    } catch (error) {
        res.status(500).send('Error getting token');
    }
});

// Routes
const saveDoctor = require('./saveDoctor');
app.post('/api/saveDoctor', saveDoctor);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
