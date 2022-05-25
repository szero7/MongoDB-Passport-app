"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const morgan = require("morgan");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const path = require("path");
const layouts = require("express-ejs-layouts");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy; // startegy local
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const Product = require("./models/product");
const routes = require("./routes/api");

dotenv.config({ path: "./config.env" });
app.set("view engine", "ejs");
app.use(morgan('tiny'));
app.use(layouts);
app.set("layout", "./layouts/myLayouts");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.use(express.json());


const DATABASE_LOCAL = process.env.DATABASE_LOCAL;
mongoose.connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true }).then(() => {
    console.log(`Vous etes connecté sur notre base de données ${DATABASE_LOCAL}`);
}).catch(() => {
    console.log(`Vous n'etes pas connecté sur notre base de données ${DATABASE_LOCAL}`);
});


app.use(cookieParser("secret_passcode"));
app.use(session({
    secret: "secret_passcode",
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 40000
    }

}));


app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.user = req.user;
    next();
});


app.use(routes);



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server has started and is listening at http://localhost:${port}`);
});