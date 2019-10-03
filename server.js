const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      helmet = require('helmet'),
      compression = require('compression'),
      low = require("lowdb"),
      FileSync = require("lowdb/adapters/FileSync"),
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
const adapter = new FileSync("database.json")
const db = low(adapter)
db.defaults({users: []}).write()

app.post("/signUp", (req, res) => {
  let user = db.get("users").filter({ username: req.body.username})
  console.log(user.value().length)
  if(user.value().length === 0){
    db.get('users').push(req.body).write()

    res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    res.end()
  }
  else{
    res.writeHead( 422, "user Exist", {'Content-Type': 'text/plain' })
    res.end()
  }
})


app.listen(process.env.PORT || port, process.env.IP, () => {
  console.log("Server is listening on port ", process.env.PORT || port, "...");
});
