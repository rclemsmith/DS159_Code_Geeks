var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pendingSchema = new Schema({
  name: String,
  type: String,
  facts: String,
  court: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Court",
    },
  },
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  },
  lawyer: { name: String, uid: String },
});

module.exports = mongoose.model("PendingCase", pendingSchema);
