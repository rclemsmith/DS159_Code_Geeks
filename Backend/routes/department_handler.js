var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");
const Case = require("../models/cases");
const Hearing = require("../models/hearing");
const Department = require("../models/department");
const { route } = require(".");

router.get("/active/:departmentName", (req, res) => {
  Case.find(
    { department: req.params.departmentName, isClosed: false },
    (err, foundCases) => {
      if (err) {
        res.json(err);
      } else {
        res.statusCode = 200;

        res.setHeader("Content-Type", "application/json");
        res.json(foundCases);
        console.log(foundCases);
        console.log(req.params.departmentName);
      }
    }
  );
});

router.get("/closed/:departmentName", (req, res) => {
  Case.find(
    { department: req.params.departmentName, isClosed: true },
    (err, foundCases) => {
      if (err) {
        res.json(err);
      } else {
        res.statusCode = 200;
        res.json(foundCases);
      }
    }
  );
});

router.get("/:caseId/casedetails", (req, res, next) => {
  Case.findById(req.params.caseId)
    .then((curcase) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(curcase);
      console.log(curcase);
    })
    .catch((err) => console.log(err));
});

router.get("/:caseId/hearing", (req, res) => {
  Hearing.find({ caseid: req.params.caseId })
    .sort({ curhearingdate: "asc" })
    .exec((err, curhearing) => {
      console.log(curhearing);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(curhearing);
    });
});

router.get("/hear/:departmentName", (req, res) => {
  Hearing.find({ department: req.params.departmentName })
    .sort({ nexthearingdate: "asc" })
    .exec((err, curhearing) => {
      console.log(curhearing);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(curhearing);
      console.log(err);
    });
});

router.get("/closed/:departmentName", (req, res) => {
  Case.find(
    { department: req.params.departmentName, isClosed: true },
    (err, foundCases) => {
      if (err) {
        res.json(err);
      } else {
        res.statusCode = 200;
        res.json(foundCases);
      }
    }
  );
});

router.get("/cases/:departmentName", (req, res) => {
  Case.find({ department: req.params.departmentName }, (err, foundCases) => {
    if (err) {
      res.json(err);
    } else {
      res.statusCode = 200;
      res.json(foundCases);
    }
  });
});

module.exports = router;
