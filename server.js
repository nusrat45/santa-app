const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const homeRoute = require('./routes/index');
const sendRequestRoute = require('./routes/sendRequest');
const alertRoute = require('./routes/alert');
const { sendMail } = require('./controllers/sendMail');
const cron = require('node-cron');

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'));

// All Routes
app.use('/', homeRoute)
app.use('/', sendRequestRoute)
app.use('/', alertRoute)

// EJS view engine for html 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// listen for requests :)
const listener = app.listen(PORT, function () {
  console.log('Server is running on port ' + listener.address().port);
});

//Send email in 15 seconds
cron.schedule("*/15 * * * * *", function() {
  sendMail();
});

