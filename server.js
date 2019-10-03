const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    compression = require('compression'),
    favicon = require('serve-favicon'),
    mongoose = require('mongoose'),
    Landlord = require("./models/landlord"),
    Tenant = require("./models/tenant"),
    User = require("./models/user"),
    passport  = require( 'passport' ),
    LocalStrategy = require( 'passport-local'),
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

//var url = process.env.DATABASEURL || "mongodb://localhost/marketplace_beta";

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

// Passport Configuration
app.use(require("express-session")({
    secret: "This is a sample secret text for encoding",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.use(new LocalStrategy(Landlord.authenticate()));
// passport.serializeUser(Landlord.serializeUser());
// passport.deserializeUser(Landlord.deserializeUser());
//
// passport.use(new LocalStrategy(Tenant.authenticate()));
// passport.serializeUser(Tenant.serializeUser());
// passport.deserializeUser(Tenant.deserializeUser());

// Middleware to pass user and message data to each route
// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
//     next();
// });

app.listen(process.env.PORT || port, process.env.IP, () => {
    console.log("Server is listening on port ", process.env.PORT || port, "...");
});