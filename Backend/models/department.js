var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var DepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    officialname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
DepartmentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Department", DepartmentSchema);
