const bcrypt = require('bcrypt');
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

let cors = require('cors');
let bodyParser = require('body-parser');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json()); // for parsing application/json
app.use(cors());

// api routes
// event
const eventRoute = require('./Routes/eventRoute');
app.use('/event', eventRoute);
// email
// gmail to any
const emailRoute = require('./Routes/emailRoute');
app.use('/email', emailRoute);
// auth-route
const authRoute = require('./Routes/authRoute');
app.use('/auth', authRoute);
// math-test
const mathTestRoute = require('./Routes/mathTestRoute');
app.use('/math-test', mathTestRoute);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express - Node js Running on :  ${port}`);

// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});