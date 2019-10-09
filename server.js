const express = require('express'),
  session = require('express-session'),
  app = express(),
  bodyParser = require('body-parser'),
  helmet = require('helmet'),
  compression = require('compression'),
  low = require("lowdb"),
  FileSync = require("lowdb/adapters/FileSync"),
  passport = require('passport'),
  Local = require('passport-local').Strategy,
  port = 3000;

let credentials = null

// automatically deliver all files in the public folder
// with the correct headers / MIME type.
app.use(express.static('public'));

// middleware
app.use(helmet());
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(compression());
app.use(bodyParser.json());

const myLocalStrategy = function (username, password, done) {
  const user = db.get('users').value().find(__user => __user.username === username)
  if (user === undefined) {
    return done(null, false, { message: 'user not found' })
  }
  else if (user.password === password) {
    credentials = username
    return done(null, { username, password })
  }
  else {
    return done(null, false, { message: 'incorrect password' })
  }
}

passport.use('local-login', new Local(myLocalStrategy))

passport.initialize()

passport.serializeUser((user, done) => done(null, user.username))

passport.deserializeUser((username, done) => {
  const user = db.get('users').find(u => u.username === username)
  console.log('deserializing:', username)

  if (user !== undefined) {
    done(null, user)
  } else {
    done(null, false, { message: 'user not found; session not restored' })
  }
})

app.use(session({ secret: 'cats cats cats', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.post('/test', function (req, res) {
  console.log('authenticate with cookie?', req.user)
  res.json({ status: 'success' })
})

app.get('/currentUser', function (req, res) {
  res.send(JSON.stringify(db.get('users').find({ username: credentials }).value()))
})

// domain views index.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
  response.send('hello, world!');
});

// connect to db
const adapter = new FileSync("database.json")
const db = low(adapter)
db.defaults({ users: [], apartments: [], keycount: 1 }).write()

app.post("/signUp", (req, res) => {
  let user = db.get("users").filter({ username: req.body.username })
  console.log(user.value().length)
  if (user.value().length === 0) {
    db.get('users').push(req.body).write()

    res.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    res.end()
  }
  else{
    res.writeHead( 422, "User Exists", {'Content-Type': 'text/plain' })
    res.end()
  }
})

app.post("/addEvent", (req, res) => {
  let event = db.get("events").filter({ eventid: req.body.eventid})
  console.log(event.value().length)
  if(event.value().length === 0){
    db.get('events').push(req.body).write()

    res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    res.end()
  }
  else{
    res.writeHead( 422, "Event Exists", {'Content-Type': 'text/plain' })
    res.end()
  }
})

app.post("/addPayment", (req, res) => {
  let payment = db.get("payments").filter({ paymentid: req.body.paymentid})
  console.log(payment.value().length)
  if(payment.value().length === 0){
    db.get('payments').push(req.body).write()

    res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    res.end()
  }
  else{
    res.writeHead( 422, "Payment Exists", {'Content-Type': 'text/plain' })
    res.end()
  }
})

app.post("/addService", (req, res) => {
  let service = db.get("services").filter({ serviceid: req.body.serviceid})
  console.log(service.value().length)
  if(service.value().length === 0){
    db.get('services').push(req.body).write()

    res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    res.end()
  }
  else{
    res.writeHead( 422, "Service Exists", {'Content-Type': 'text/plain' })
    res.end()
  }
})

app.post('/login',
  passport.authenticate('local-login', {}),
  function (req, res) {
    let user = db.get('users').find({ username: req.body.username })
    let type = user.value().userType
    res.end(JSON.stringify(type))
    // console.log('login works')
    // res.redirect('/');
  }
);

app.post('/addApartment', function (request, response) {
  dataString = ''

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    var apartment = JSON.parse(dataString)
    var address = (apartment.address)
    var key = db.get('keycount').value()
    var landlord = (apartment.landlord)

    obj = { address: address, key: key, landlord: landlord }
    console.log(obj)

    db.get('apartments')
      .push(obj)
      .write()

    // increment keycount
    db.update('keycount', n => n + 1)
      .write()

    response.writeHead(200, "OK", { 'Content-Type': 'application/json' })
    response.end()
  })
})

// POST update profile
app.post( '/updateProfile', function( request, response ) {
  dataString = ''
  
  request.on( 'data', function( data ) {
    dataString += data
  })

  request.on( 'end', function() {

    var updatedata = JSON.parse(dataString)
    var firstName = (updatedata.firstName)
    var lastName = (updatedata.lastName)
    var phone = (updatedata.phone)
    var email = (updatedata.email)
    var username = (updatedata.username)

    db.get('users')
      .find({username: username})
      .assign({ first: firstName, last: lastName, phone: phone, email: email}) 
      .write()

    response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    response.end()
  })
})

app.get('/getServices', function(req,res) {
  res.send(JSON.stringify(db.get('services').filter({}).values()))
})

app.listen(process.env.PORT || port, process.env.IP, () => {
  console.log("Server is listening on port ", process.env.PORT || port, "...");
});
