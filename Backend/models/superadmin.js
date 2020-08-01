var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var SuperAdminSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    reports: []
}, { timestamps: true });


SuperAdminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("SuperAdmin", SuperAdminSchema);
