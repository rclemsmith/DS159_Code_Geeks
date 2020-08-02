var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");
const Case = require("../models/cases");

router.post("/:departmentName", (req, res) => {
  var query = req.body.query;
  console.log(query);
  // var tags = query.split(" ");
  // console.log(tags);
  var result = [];

  // Case.find({ department: req.params.departmentName })
  //   .then((cases) => {
  //     cases.forEach((entry) => {
  //       var count = 0;
  //       tags.forEach((tag) => {
  //         if(entry.synopsis){
  //           if (entry.synopsis.toLowerCase().includes(tag.toLowerCase())) {
  //             count++;
  //           }
  //         }

  //       });
  //       if (count == tags.length) {
  //         result.push(entry);
  //       }
  //     });
  //     console.log(result);
  //     res.statusCode = 200;
  //     res.json(result);
  //   })
  //   .catch((err) => console.log(err));

  Case.find({ department: req.params.departmentName })
    .then((cases) => {
      console.log(cases);

      cases.forEach(function (entry) {
        if (entry.type.toLowerCase().includes(query.toLowerCase())) {
          var put = {
            name: entry.name,
            caseno : entry.caseno,
            type: entry.type,
            facts: entry.facts,
            synopsis : entry.synopsis
          };
          result.push(entry);
        } else if (entry.name.toLowerCase().includes(query.toLowerCase())) {
          var put = {
            name: entry.name,
            type: entry.type,
            caseno : entry.caseno,
            facts: entry.facts,
            synopsis : entry.synopsis
          };
          result.push(entry);
        } else if (entry.facts.toLowerCase().includes(query.toLowerCase())) {
          var put = {
            name: entry.name,
            type: entry.type,
            caseno : entry.caseno,
            facts: entry.facts,
            synopsis : entry.synopsis
          };
          result.push(entry);
        } else if (entry.synopsis.toLowerCase().includes(query.toLowerCase())) {
          var put = {
            name: entry.name,
            type: entry.type,
            caseno : entry.caseno,
            facts: entry.facts,
            synopsis : entry.synopsis
          };
          result.push(entry);
        }
      });

      res.statusCode = 200;
      res.json(result);

      console.log(result);
    })
    .catch((err) => console.log(err));
});

router.post("/active/:departmentName", (req, res) => {
  var query = req.body.query;
  console.log(query);
  var tags = query.split(" ");
  console.log(tags);
  var result = [];

  Case.find({ department: req.params.departmentName, isClosed: false })
    .then((cases) => {
      cases.forEach((entry) => {
        var count = 0;
        tags.forEach((tag) => {
          if (entry.synopsis.toLowerCase().includes(tag.toLowerCase())) {
            count++;
          }
        });
        if (count == tags.length) {
          result.push(entry);
        }
      });
      console.log(result);
      res.statusCode = 200;
      res.json(result);
    })
    .catch((err) => console.log(err));
});

router.post("/close/:departmentName", (req, res) => {
  var query = req.body.query;
  console.log(query);
  var tags = query.split(" ");
  console.log(tags);
  var result = [];

  Case.find({ department: req.params.departmentName, isClosed: true })
    .then((cases) => {
      cases.forEach((entry) => {
        var count = 0;
        tags.forEach((tag) => {
          if (entry.synopsis.toLowerCase().includes(tag.toLowerCase())) {
            count++;
          }
        });
        if (count == tags.length) {
          result.push(entry);
        }
      });
      console.log(result);
      res.statusCode = 200;
      res.json(result);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
