const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const favicon = require('serve-favicon')
const passport  = require( 'passport' )
const Local     = require( 'passport-local' ).Strategy

// automatically deliver all files in the public folder
// with the correct headers / MIME type.
app.use(express.static('public'))

// middleware
app.use(helmet())
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(compression())
app.use(bodyParser.json())
app.use(passport.initialize())

// domain views index.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html')
  response.send('hello, world!')
})

const myLocalStrategy = function( username, password, done ) {
  /*const user = db.get('users').value().find( __user => __user.username === username )
  if( user === undefined ) {
    return done( null, false, { message:'user not found' })
  }
  else if( user.password === password ) {
    return done( null, { username, password })
  }
  else{
    return done( null, false, { message: 'incorrect password' })
  }*/
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

console.log('Express Launched')

app.listen(process.env.PORT || 3000)
