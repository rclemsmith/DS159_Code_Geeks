var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");
var multer = require("multer");
/* GET users listing. */
const Case = require("../models/cases");
const Client = require("../models/client");
const PendingCase = require("../models/pending");
const multerUpload = require("../services/multer_service");
const { route } = require("./court_auth");
const Court = require("../models/court");
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", passport.authenticate("client"), function (
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
    status: "Login Successful!",
    token: token,
    userId: req.user._id,
    name: req.user.name,
  });
});

router.post("/signup", multerUpload.single("image"), (req, res, next) => {
  // req.multer.single("awesome");
  console.log("Inside Client Post");
  console.log(req.body);
  // console.log(req.file);
  // console.log(req.file.filename);
  console.log("Afetr File Upload");

  var client = new Client({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    dob: req.body.dob,
    street: req.body.street,
    district: req.body.district,
    state: req.body.state,
    pincode: req.body.pincode,
    gender: req.body.gender,
    image: req.file.filename,
  });
  console.log(client);
  Client.register(client, req.body.password, (err, client) => {
    console.log("Regsitered");
    if (err) {
      res.status = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ err: err });
      console.log(err);
    } else {
      passport.authenticate("client")(req, res, () => {
        console.log(req.user);
        const token = authenticate.getToken({ _id: req.user._id });
        res.cookie("token", token, { httpOnly: true });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Login Successful!",
          token: token,
          userId: req.user._id,
          name: req.user.name,
        });
      });
    }
  });
});

//@route
//@description create newcase route
router.post("/:userId/newCase", (req, res, next) => {
  Court.find({ name: req.body.courtname }, (err, found) => {
    console.log(found);
    if (err) {
      console.log(err);
    } else {
      var author = {
        id: req.params.userId,
      };
      var lawyerr = {
        name: req.body.lawyername,
        uid: req.body.lawyerid,
      };

      var courtt = {
        id: found[0]._id,
      };

      var newCase = new PendingCase({
        name: req.body.casename,
        type: req.body.type,
        facts: req.body.facts,
        lawyer: lawyerr,
        author: author,
        court: courtt,
      });

      PendingCase.create(newCase)
        .then((mycase) => {
          console.log(mycase);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(mycase);
        })

        .catch((err) => console.log(err));
    }
  });
});

router.get("/:userId/mycases", (req, res) => {
  Case.find({ "author.id": req.params.userId })
    .then((cases) => res.json(cases))
    .catch((err) => res.status(400).json({ nocase: "nocase" }));
});
//@route
//description get pending case by client id
router.get("/:userId/pending", (req, res) => {
  PendingCase.find({ "author.id": req.params.userId })
    .then((pencase) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(pencase);
    })
    .catch((err) => console.log(err));
});

router.get("/:userId/profile", (req, res, next) => {
  Client.findById(req.params.userId)
    .then(
      (user) => {
        if (user != null) {
          res.statusCode = 200;
          res.setHeader("Content-type", "application/json");
          res.json(user);
        } else {
          err = new Error("User" + req.params.userId + "not found");
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

//@route
//description get a client by id
router.get("/:userId", (req, res, next) => {
  Client.findById(req.params.userId)
    .then((client) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(client);
    })
    .catch((err) => console.log(err));
});

//@route
//description get a case by id
router.get("/:caseId/casedetails", (req, res, next) => {
  Case.findById(req.params.caseId)
    .then((mycase) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(mycase);
    })
    .catch((err) => console.log(err));
});

//@route
//@description update the profile
router.put("/:userId/update", (req, res) => {
  Client.findByIdAndUpdate(req.params.userId, req.body)
    .then((client) => res.json({ msg: "Updated Successfully" }))
    .catch((err) => console.log(err));
});

module.exports = router;
