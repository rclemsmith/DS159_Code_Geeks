var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var ClientSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  mobile: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  image: { type: String, required: true },
});

ClientSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Client", ClientSchema);
