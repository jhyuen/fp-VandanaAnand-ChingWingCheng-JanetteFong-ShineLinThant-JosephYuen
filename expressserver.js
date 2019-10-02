const express   = require( 'express' ),
      app       = express(),
      bodyParser= require( 'body-parser' ),
      helmet = require('helmet'),
      compression = require('compression'),
      favicon = require('serve-favicon')

// automatically deliver all files in the public folder
// with the correct headers / MIME type.
app.use(express.static('public'))

// middleware
app.use(helmet())
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(compression())
app.use(bodyParser.json())

// domain views index.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html')
  response.send('hello, world!')
})

console.log('Express Launched')

app.listen(process.env.PORT || 3000)
