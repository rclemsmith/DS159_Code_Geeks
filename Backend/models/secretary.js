var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var SecretarySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
}, { timestamps: true });


SecretarySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Secretary", SecretarySchema);