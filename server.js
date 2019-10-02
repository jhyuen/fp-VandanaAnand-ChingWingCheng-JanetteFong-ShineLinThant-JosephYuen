const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      helmet = require('helmet'),
      compression = require('compression'),
      favicon = require('serve-favicon'),
      mongoose = require('mongoose'),
      Landlord = require("./models/landlord"),
      Tenant = require("./models/tenant"),
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

const myLocalStrategy = function( username, password, done ) {
    let user
    console.log("User " + username + " requested")
    loginInfo.find({}).toArray().then( result => {
        user = result[0]

        if( user === undefined) {
            return done(null, false, {message: 'user not found'})

        }
        else if(user.username === username && user.password === password) {
            return done(null, {username, password})
        }
        else {
            return done(null, false, {message: 'incorrect password'})
        }
    })

}

passport.use( 'local-login', new Local( myLocalStrategy ) )
passport.initialize()

passport.serializeUser( ( user, done ) => done( null, user.username ) )

passport.deserializeUser( ( username, done ) => {
    let user
    loginInfo.find({}).toArray().then(result => {
        user = result[0]
        if(user !== undefined) {
            done(null, user)
        }
        else {
            done(null, false, {message: 'user not found: session not restored'})
        }
    })
})

app.use( passport.initialize() )
app.use( passport.session() )

app.listen(process.env.PORT || port, process.env.IP, () => {
  console.log("Server is listening on port ", process.env.PORT || port, "...");
});
