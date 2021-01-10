const express               = require("express"),
      mongoose              = require('mongoose'),
      User                  = require('./models/user'),
      passport              = require('passport'),
      bodyParser            = require('body-parser'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose')


mongoose.connect("mongodb://localhost/auth_demo_app")

const app = express();
app.set('view engine', 'ejs');

app.use(require('express-session')({
    secret: "Mai hun Don",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req,res) => {
    res.render("home")
})

app.get("/secret", (req,res) => {
    res.render("secret")
})

const PORT = 3500
app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})