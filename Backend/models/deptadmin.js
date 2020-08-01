var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var DepartmentAdminSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        nodalname: { type: String, required: true },
        email: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

DepartmentAdminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("DepartmentAdmin", DepartmentAdminSchema);
