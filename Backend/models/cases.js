var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var caseSchema = new Schema({
  name: String,
  type: String,
  facts: String,
  opposition: String,
  oppositionLayer : String,
  respondantName : String,
  respondantDesignation : String,
  caseNo : String,
  lawyer: {
    lname: String,
    gender: String,
    exp: String,
    qualification: String,
    mobile: Number,
    email: String,
    uid: String,
    casesWon: Number,
    caseslost: Number,
    skills: String,
    street: String,
    district: String,
    state: String,
    image: String,
    pincode: String,
  },
  isClosed: Boolean,
  createdAt: { type: Date, default: Date.now },
  status: String,
  court: {
    cname: String,
    cdistrict: String,
    cstate: String,
    ccategory: String,
    cpincode: String,
  },
  judge: String,

  department: String,
  admin: String,
});

module.exports = mongoose.model("Case", caseSchema);
