var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WitnessSchema = new Schema({
  name: String,
  age: String,
  phone: Number,
  comments: String,
  district: String,
  state: String,
  pincode: String,
});

var HearingSchema = new Schema({
  caseid: String,
  curhearingdate: Date,
  curhearingfacts: String,
  curhearingjudge: String,
  curhearinglawyer: String,
  curhearingwitness: [WitnessSchema],
  curhearingverdict: String,
  nexthearingdate: Date,
  department: String,
  documents : []
});

module.exports = mongoose.model("Hearing", HearingSchema);
