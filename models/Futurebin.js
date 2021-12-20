"use strict";

const mongoose = require('mongoose');

const futurebin = mongoose.Schema({
    code:{type:String, required:true},
    text:{type:String, required:true},
    language:{type:String, required:true},
    expireAt: {type: Date, required: false},
}, {
    timestamps:true
});
futurebin.index({ expireAt: 1 }, { expireAfterSeconds : 0 });
module.exports = mongoose.model("Futurebin",futurebin); 