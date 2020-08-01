var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");
var CourtSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  courtid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  landline: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
});

CourtSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Court", CourtSchema);
