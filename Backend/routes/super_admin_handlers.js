var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");
const SuperAdmin = require("../models/superadmin");

const transporter = require("../services/mailservice");

router.post("/login", passport.authenticate("superadmin"), (req, res) => {
  // console.log(req.user)

  rand = Math.floor(Math.random() * 100000 + Math.random() * 1000);
  var mailOptions = {
    from: "smartindiahack2020@gmail.com",
    to: req.user.email,
    subject: "Please confirm your Email account",
    text: " This is your OTP for Login : " + rand,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      const token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Super Admin Login Successful",
        token: token,
        userId: req.user._id,
        name: req.user.name,
        otp: rand,
        reports: req.user.reports
      });
    }
  });
});

router.get("/", (req, res) => {
  res.json(req.user);
});

router.post("/signup", (req, res, next) => {
  var superAdmin = new SuperAdmin({
    username: req.body.username,
    name: req.body.name,
    email : req.body.email
  });
  SuperAdmin.register(superAdmin, req.body.password, (err, admin) => {
    console.log("Regsitered");
    if (err) {
      res.status = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
      console.log(err);
    } else {
      passport.authenticate("superadmin")(req, res, () => {
        console.log(req.user);
        const token = authenticate.getToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Super Admin Login Successful",
          token: token,
          userId: req.user._id,
          name: req.user.name,
          reports: req.user.reports
        });
      });
    }
  });
});

module.exports = router;
