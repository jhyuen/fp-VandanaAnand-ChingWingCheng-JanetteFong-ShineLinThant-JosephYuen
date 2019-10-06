const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      helmet = require('helmet'),
      compression = require('compression'),
      low = require("lowdb"),
      FileSync = require("lowdb/adapters/FileSync"),
      passport  = require( 'passport' ),
      Local     = require( 'passport-local' ).Strategy,
      port = 3000;

// automatically deliver all files in the public folder
// with the correct headers / MIME type.
app.use(express.static('public'));

// middleware
app.use(helmet());
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(compression());
app.use(bodyParser.json());

const myLocalStrategy = function( username, password, done ) {
  const user = db.get('users').value().find( __user => __user.username === username )
  if( user === undefined ) {
    return done( null, false, { message:'user not found' })
  }
  else if( user.password === password ) {
    return done( null, { username, password })
  }
  else{
    return done( null, false, { message: 'incorrect password' })
  }
}

passport.use( 'local-login', new Local( myLocalStrategy ) )

passport.initialize()

passport.serializeUser( ( user, done ) => done( null, user.username ) )

passport.deserializeUser( ( username, done ) => {
  const user = users.find( u => u.username === username )
  console.log( 'deserializing:', name )

  if( user !== undefined ) {
    done( null, user )
  }else{
    done( null, false, { message:'user not found; session not restored' })
  }
})

app.use( passport.initialize() )
app.use( passport.session() )


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

app.post('/login',
    passport.authenticate('local-login', {}),
    function (req, res) {
      console.log('login works')
      res.redirect('/');
    }
);

app.listen(process.env.PORT || port, process.env.IP, () => {
  console.log("Server is listening on port ", process.env.PORT || port, "...");
});
