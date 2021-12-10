"use strict";

const mongoose = require('mongoose');

const futurebin = mongoose.Schema({
    code:{type:String, required:true},
    text:{type:String, required:true},
    language:{type:String, required:true},
    expiration_time:{type: Date, required:false}
}, {
    timestamps:true
});

module.exports = mongoose.model("Futurebin",futurebin); 