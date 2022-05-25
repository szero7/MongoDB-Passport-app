"use strict";

const mongoose = require("mongoose");

//schema du produit (code/description/price)
const productSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    }
});

productSchema.methods.getInfos = function() {
    return `Code: ${this.code} Description: ${this.description} Price: ${this.price}`;
};


//exporter le schema produit
module.exports = mongoose.model("Product", productSchema);