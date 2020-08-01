var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");
const Court = require("../models/court");
const Case = require("../models/cases");
const PendingCase = require("../models/pending");
const Client = require("../models/client");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'smartindiahack2020@gmail.com',
    pass: 'smartindiahack'
  }
});

router.post("/:courtId/newCase", (req, res) => {
  var author = {
    id: req.body.authorid,
    name: req.body.authorname,
  };

  var lawyer = {
    name: req.body.lawyername,
    uid: req.body.uid,
  };

  var newCase = new Case({
    name: req.body.name,
    type: req.body.type,
    facts: req.body.facts,
    author: author,
    status: req.body.status,
    lawyer: lawyer,
    court: { id: req.params.courtId },
  });

  Case.create(newCase)
    .then((newcase) => {
      console.log(newcase);
    })
    .catch((err) => console.log(err));
});

router.post("/:id/modifycase", (req, res) => {
  Case.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firsthearing: req.body.firsthearing,
        nexthearing: req.body.nexthearing,
        status: req.body.status,
        comment: req.body.comment,
        courtno: req.body.courtno,
        judge: req.body.judge,
      },
    },
    { new: true },
    (err, updated) => {
      if (err) {
        console.log(err);
      } else {
        console.log(updated);
      }
    }
  );
});

router.get("/:courtId/pending", (req, res) => {
  PendingCase.find({ "court.id": req.params.courtId })
    .then((pencase) => {
      res.json(pencase);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/modifypendingcase", (req, res) => {
  var lawyer = {
    name: req.body.lawyer.name,
    uid: req.body.lawyer.uid
  }
  Case.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        type: req.body.type,
        facts: req.body.facts,
        lawyer: lawyer
      },
    },
    { new: true },
    (err, updated) => {
      if (err) {
        console.log(err);
      } else {
        console.log(updated);
      }
    }
  );
});

router.get("/acceptCase/:caseId", (req, res) => {
  PendingCase.findById(req.params.caseId, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      console.log(found);
      var casenew = new Case({
        name: found.name,
        type: found.type,
        facts: found.facts,
        createdAt: found.createdAt,
        author: found.author,
        lawyer: found.lawyer,
        firsthearing: null,
        nexthearing: null,
        status: null,
        comment: null,
        courtno: null,
        judge: null
      });
      Case.create(casenew, (err, insertedCase) => {
        if (err) {
          console.log(err)
        } else {
          PendingCase.findByIdAndRemove(req.params.caseId, (err, deleted) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Deleted");
              console.log(deleted);
              res.send("Success");
            }
          });

        }

      });
    }
  });
});


router.get("/:courtId/actcase", (req, res) => {
  Case.find({ "court.id": req.params.courtId })
    .then((actcase) => res.json(actcase))
    .catch((err) => console.log(err));
});

router.get("/:pcaseId", (req, res) => {
  PendingCase.findById(req.params.pcaseId)
    .then((pcase) => {
      res.json(pcase);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/rejectCase/:caseId", (req, res) => {
  PendingCase.findById(req.params.caseId, (err, foundCase) => {
    if (err) {
      console.log(err);
    } else {
      Client.findById(foundCase.author.id, (err, foundClient) => {
        if (err) {
          console.log(err);
        } else {
          var email = foundClient.email;
          console.log(email);
          var mailOptions = {
            from: 'smartindiahack2020@gmail.com',
            to: email,
            subject: 'Your Case Was Rejected',
            text: "Your Case with Name : " + foundCase.name + " of Type : " + foundCase.type + " was Rejected By the Court"
          };
          PendingCase.findByIdAndRemove(req.params.caseId, (err, deleted) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Deleted");
              console.log(deleted);
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  res.send("Success");
                }
              });

            }
          });
        }
      });
    }
  });

});


module.exports = router;
