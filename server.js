const express = require('express');
const bodyParser = require('body-parser');
const saveDoctor = require('./api/saveDoctor');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/saveDoctor', saveDoctor);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});