/**
 * RealEstateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var crypto = require("crypto");
var assert = require("assert");
var algorithm = "aes256"; // or any other algorithm supported by OpenSSL
var key = "cloudComputing";

module.exports = {
  requestAppraisal: function(req, res) {
    var name = req.param("name");
    var MortID = req.param("MortID");
    var MlsID = req.param("MlsID");
    console.log(name);
    MbrUser.findOne({ MlsID: MlsID }).exec(function(err, user) {
      if (err) {
        Logger(err, "MBR");
        res.send(err);
      } else if(user!=null){
        RealEstate.create({
          fullName: name,
          MlsID: MlsID,
          MortID: MortID
        }).exec(function(err) {
          if (err) {
            console.log("entered in error block.", err);
            var errCode = err.code;
            if (errCode == "E_UNIQUE") {
              var log = "E_UNIQUE";
              var timestamp = new Date().getTime();
              var server = "Real Estate";
              Logger.create({ time: timestamp, log: log, server: server }).exec(
                function(err) {}
              );
              return res.send({
                error: "MortID already exist",
                status: "fail"  
              });
            } else {
              return res.send({ error: "message", status: "fail" });
            }
          } else {
            console.log("entered in good block.");

            //log real estate appraisal submited
            var log = "Log real estate appraisal submited";
            var timestamp = new Date().getTime();
            var server = "Real Estate";
            Logger.create({ time: timestamp, log: log, server: server }).exec(
              function(err) {}
            );
            res.send({ status: "Success" });
          }
        });
      }
      else{
        console.log("entered in else block.");
        res.send({ status: "Please provide correct values." });
      }
    });
  },
  // SHOW DATABASE OF COMPANY.
  getREDB: function(req, res) {
    RealEstate.find({}).exec(function(err, rec) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.view("pages/realEstate/listRE", { recList: rec });
    });
  },

  fetchAppraisals: function(req, res) {
    RealEstate.find().exec(function(err, Appraisals) {
      if (err) {
        //Log error message: failed to fetch list of appraisals
        var log = "Log error message: failed to fetch list of appraisals";
        var timestamp = new Date().getTime();
        var server = "Real Estate";
        Logger.create({ time: timestamp, log: log, server: server }).exec(
          function(err) {}
        );
      } else {
        //Log appraisals fetched
        var log = "Log appraisals fetched";
        var timestamp = new Date().getTime();
        var server = "Real Estate";
        Logger.create({ time: timestamp, log: log, server: server }).exec(
          function(err) {}
        );
        res.locals.layout = "layouts/realEstate/layout.ejs";
        return res.view("pages/realEstate/AppraisalList", {
          Appraisals: Appraisals
        });
      }
    });
  },

  deleteApplication: function(req, res) {
    var MortID = req.param("MortID");
    var timestamp = new Date().getTime();
    var server = "Real Estate";
    RealEstate.destroy({ MortID: MortID })
      .meta({ fetch: true })
      .exec(function(err, data) {
        if (err) {
          var log = "Unsuccessful in Updating Real Estate Database";
          Logger.create({ time: timestamp, log: log, server: server }).exec(
            function(err) {}
          );
          return res.send({
            error: "Unsuccessful in Updating Real Estate Database",
            status: "fail"
          });
        } else {
          var log = "Successfully sent data to Insurace";
          Logger.create({ time: timestamp, log: log, server: server }).exec(
            function(err) {}
          );
          return res.send({ status: "Successful" });
        }
      });
  },

  appraiserSignUp: function(req, res) {
    var email = req.param("email");
    var password = req.param("password");
    var cipher = crypto.createCipher(algorithm, key);
    password = cipher.update(password, "utf8", "hex") + cipher.final("hex");
    Appraiser.create({
      email: email,
      password: password
    }).exec(function(err) {
      if (err) {
        var errCode = err.code;
        if (errCode == "E_UNIQUE") {
          //Log error message
          var log = "Log error message;E_UNIQUE";
          var timestamp = new Date().getTime();
          var server = "Real Estate";
          Logger.create({ time: timestamp, log: log, server: server }).exec(
            function(err) {}
          );
          res.send({ error: "Email already exist", status: "fail" });
        } else {
          var log = "Failed in signing up.";
          var timestamp = new Date().getTime();
          var server = "Real Estate";
          Logger.create({ time: timestamp, log: log, server: server }).exec(
            function(err) {}
          );
          res.send({ error: message, status: "fail" });
        }
      } else {
        //Log real estate appraiser account created
        var log = "Log real estate appraiser account created";
        var timestamp = new Date().getTime();
        var server = "Real Estate";
        Logger.create({ time: timestamp, log: log, server: server }).exec(
          function(err) {}
        );
        res.send({ status: "Success" });
      }
    });
  },

  appraiserLogin: function(req, res) {
    var email = req.param("email");
    var password = req.param("password");

    Appraiser.findOne({ email: email }).exec(function(err, appraiser) {
      if (err) {
        return res.send(err);
      } else {
        if (!appraiser) {
          //Log error
          var log = "Error in appraiserLogin";
          var timestamp = new Date().getTime();
          var server = "Real Estate";
          Logger.create({ time: timestamp, log: log, server: server }).exec(
            function(err) {}
          );
          return res.send({
            status: "unauthentic",
            error: "Appraiser is not registered"
          });
        } else {
          var decipher = crypto.createDecipher(algorithm, key);
          var decrypted =
            decipher.update(appraiser.password, "hex", "utf8") +
            decipher.final("utf8");
          if (password == decrypted) {
            //Log user Sign In successfull
            var log = "Error in appraiserLogin";
            var timestamp = new Date().getTime();
            var server = "Real Estate";
            Logger.create({ time: timestamp, log: log, server: server }).exec(
              function(err) {}
            );
            return res.send({ status: "authentic" });
          } else {
            //Log error
            var log = "Error in appraiserLogin";
            var timestamp = new Date().getTime();
            var server = "Real Estate";
            Logger.create({ time: timestamp, log: log, server: server }).exec(
              function(err) {}
            );
            return res.send({
              status: "unauthentic",
              error: "Email-Password combination does not exist"
            });
          }
        }
      }
    });
  }
};
