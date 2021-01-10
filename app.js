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
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret: "Mai hun Don",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===========
//Routes
//===========

app.get("/", (req,res) => {
    res.render("home")
});

app.get("/secret", (req,res) => {
    res.render("secret")
});

//auth routes

// show sign up form
app.get("/register", (req,res) => {
    res.render("register")
});

//handelling user sign up 
app.post("/register", (req,res) => {
    // res.send("register post route")
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req,res, ()=> {
            res.redirect("/secret");
        })
    })
});

// login route
app.get("/login", (req,res) => {
    res.render("login");
})

// login logic
                    // middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login",
    failureMessage: "Invalid Username or password"
}) , (req,res) => {
})

//logout

app.get("/logout", (req,res) => {
    // console.log("Logout")
    req.logOut();
    res.redirect("/");
})

const PORT = 3500
app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})