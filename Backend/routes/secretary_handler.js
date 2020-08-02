var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");
const Case = require("../models/cases");
const Secretary = require("../models/secretary");
const transporter = require("../services/mailservice");



router.post("/login",passport.authenticate("secretary"),(req,res)=>{
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
        status: "Secretary Login Successful",
        token: token,
        userId: req.user._id,
        name: req.user.name,
        otp: rand,
      });
    }
  });
});



router.post("/signup", (req, res, next) => {
    var secretary = new Secretary({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
    });
    Secretary.register(secretary, req.body.password, (err, secretary) => {
      console.log("Regsitered");
      if (err) {
        res.status = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
        console.log(err);
      } else {
        passport.authenticate("secretary")(req, res, () => {
          console.log(req.user);
          const token = authenticate.getToken({ _id: req.user._id });
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            status: "Secretary Signup Successful",
            token: token,
            userId: req.user._id,
            name: req.user.name,
          });
        });
      }
    });
  });

router.get("/cases",(req,res)=>{
    Case.find()
    .then((cases)=>{
        res.json(cases);
    })
    .catch((err)=>res.json(err));
});

router.get("/cases/filter/:departmentName",(req,res)=>{
    Case.find({department : req.params.departmentName})
    .then((cases)=>{
        res.json(cases);
    })
    .catch((err)=>res.json(err));
});


module.exports = router;