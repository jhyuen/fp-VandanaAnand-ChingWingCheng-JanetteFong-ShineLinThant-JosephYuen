const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      helmet = require('helmet'),
      compression = require('compression'),
      favicon = require('serve-favicon'),
      mongoose = require('mongoose'),
      Landlord = require("./models/landlord"),
      Tenant = require("./models/tenant"),
      port = 3000;

// automatically deliver all files in the public folder
// with the correct headers / MIME type.
app.use(express.static('public'));

// middleware
app.use(helmet());
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(compression());
app.use(bodyParser.json());

// domain views index.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
  response.send('hello, world!');
});

// connect to db
let url = 'mongodb+srv://heartkiller:AsrSNmXn5dMpQgw@operation-mongoose-iyooo.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }).then(() => {
      console.log('Connected to DB!');
    }).catch(err => {
      console.log('ERROR: ', err.message);
});

app.listen(process.env.PORT || port, process.env.IP, () => {
  console.log("Server is listening on port ", process.env.PORT || port, "...");
});
