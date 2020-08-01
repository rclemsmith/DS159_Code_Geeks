var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var LawyerSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  qualification: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true },
  uid: { type: String, required: true },
  caseswon: { type: String, required: true },
  caseslost: { type: String, required: true },
  skills: { type: String, required: true },
  street: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
});

LawyerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Lawyer", LawyerSchema);
