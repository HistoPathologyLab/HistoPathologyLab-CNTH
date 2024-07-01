const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRouter = require('./auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello, this is the Histopathology Lab System.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
