"use strict";

const User = require("../models/user");
const passport = require("passport");


module.exports = {

    //renvoie à la page connexion
    login: (req, res) => {
        res.render("user/login");
    },

    //renvoie à la page enregistrement
    register: (req, res) => {
        res.render("user/register");
    },

    //enregistre l'utilisateur
    saveUser: (req, res, next) => {

        if (req.skip)
            next();

        let userParams = {
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password
        };
        const newUser = new User(userParams);

        User.register(newUser, req.body.password, (error, user) => {
            console.log(newUser);
            if (error) {
                console.log(error);
                res.locals.redirect = "/user/register";
                next();
            } else {
                res.locals.redirect = "/user/login";
                next();

            }

        });

    },

    //Identifie l'utilisateur par son email et mot de passe et renvoie ou non vers la page index
    authenticate: (req, res, next) => {
        User.findOne({ email: req.body.email }).
        then(user => {
                if (user.password == req.body.password) { // if(user.password == req.body.password){ avant utilisation bcrypt + comparison (user.js)
                    res.locals.redirect = `/user/${user._id}`;
                    res.locals.user = user;
                    next();

                } else {
                    res.locals.redirect = "/";
                    next();
                }
            })
            .catch(error => {
                next(error);
            });
    },

    //authentifie et redirige vers l'index, si les identifiants sont invalides, affiche le message sur la meme page
    authenticate1: passport.authenticate("local", {
        failureRedirect: "/",
        failureFlash: {
            type: "error_msg",
            message: "Invalid email or password. Try again !"
        },
        successRedirect: "/index"
    }),

    //deconnexion
    logout: (req, res) => {
        req.logOut();
        res.redirect("/");
    }

};