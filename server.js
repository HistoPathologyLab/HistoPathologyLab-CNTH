const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const authRouter = require('./auth');
const saveDoctor = require('./api/saveDoctor');
const removeDoctor = require('./api/removeDoctor');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use('/auth', authRouter);

app.post('/api/doctors', saveDoctor);
app.delete('/api/doctors', removeDoctor);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
