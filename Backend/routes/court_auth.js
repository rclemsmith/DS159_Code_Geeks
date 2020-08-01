var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");
const Court = require("../models/court");
const PendingCase = require("../models/pending");
const Case = require("../models/cases");

router.post("/login", passport.authenticate("court"), function (
  req,
  res,
  next
) {
  const token = authenticate.getToken({ _id: req.user._id });
  res.cookie("token", token, { httpOnly: true });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    status: "Court Login Successful!",
    token: token,
    userId: req.user._id,
    name: req.user.name,
  });
});

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  var court = new Court({
    name: req.body.name,
    courtid: req.body.courtid,
    email: req.body.email,
    landline: req.body.landline,
    type: req.body.type,
    state: req.body.state,
    district: req.body.district,
    username: req.body.username,
  });
  console.log(court);

  Court.register(court, req.body.password, (err, court) => {
    if (err) {
      res.status = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
      console.log(err);
    } else {
      passport.authenticate("court")(req, res, () => {
        console.log(req.user);
        const token = authenticate.getToken({ _id: req.user._id });
        res.cookie("token", token, { httpOnly: true });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Court Login Successful!",
          token: token,
          userId: req.user._id,
          name: req.user.name,
        });
      });
    }
  });
});

router.get("/:id", (req, res) => {
  Court.findById(req.params.id).then((mycourt) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(mycourt);
  });
});

module.exports = router;
