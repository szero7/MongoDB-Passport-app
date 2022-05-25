"use strict";

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//Schema de l'utilisateur (Nom; email)
const userSchema = new mongoose.Schema({
        name: {
            first: {
                type: String,
                trim: true

            },
            last: {
                type: String,
                trim: true

            }
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },


    },

    {
        timestamps: true //createdAt, modifiedAt
    }

);


//On veut voir fullname mais ce ne sera jamais gardé dans la base de données
userSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
});




userSchema.plugin(passportLocalMongoose, { usernameField: "email" }); //définit modele identifiant utilisé pour le login (email)



//exporte schema utilisateur
module.exports = mongoose.model("User", userSchema);