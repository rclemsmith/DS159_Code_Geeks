var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");
var passport = require("passport");
const Case = require("../models/cases");

router.post("/:departmentName", (req, res) => {
  var query = req.body.query;
  console.log(query);
  var result = [];

  Case.find({department : req.params.departmentName})
    .then((cases) => {
      console.log(cases);

      cases.forEach(function (entry) {
        if (entry.type.toLowerCase().includes(query.toLowerCase())) {
          var put = {
            name: entry.name,
            type: entry.type,
            facts: entry.facts,
          };
          result.push(put);
        } else if (entry.name.toLowerCase().includes(query.toLowerCase())) {
          var put = {
            name: entry.name,
            type: entry.type,
            facts: entry.facts,
          };
          result.push(put);
        } else if (entry.facts.toLowerCase().includes(query.toLowerCase())) {
          var put = {
            name: entry.name,
            type: entry.type,
            facts: entry.facts,
          };
          result.push(put);
        }
      });

      res.statusCode = 200;
      res.json(result);

      console.log(result);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
