const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRouter = require('./auth');
const saveDoctorRouter = require('./api/saveDoctor');
const removeDoctorRouter = require('./api/removeDoctor');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use('/auth', authRouter);
app.use('/api/doctors', saveDoctorRouter);
app.use('/api/doctors', removeDoctorRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
