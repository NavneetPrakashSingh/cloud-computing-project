/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var crypto = require("crypto");
var assert = require("assert");
var algorithm = "aes256"; // or any other algorithm supported by OpenSSL
var key = "cloudComputing";

module.exports = {
  create: function(req, res, next) {
    Logger.log("call: create", controller + "create");

    var name = req.body.name;
    var email = req.body.email;
    Employee.find({
      or: [{ name: name }, { email: email }]
    }).exec(function(err, employees) {
      if (err) {
        return res.negotiate(err);
      }
      if (employees.length) {
        return res.send({ invalid: "invalid" });
      } else {
        var name = req.body.name;
        var email = req.body.email;
        var salary = req.body.salary;
        var password = req.body.password;
        var cipher = crypto.createCipher(algorithm, key);
        password = cipher.update(password, "utf8", "hex") + cipher.final("hex");
        var tenure = req.body.tenure;
        var empID = Math.floor(Math.random() * 200);
        Employee.create({
          empID: empID,
          email: email,
          fullName: name,
          salary: salary,
          tenure: tenure,
          password: password
        }).exec(function(req_err) {
          if (req_err) {
            Logger.log("Database Error", controller + "create");
          }
        });
      }
    });
  },

  // SHOW DATABASE OF COMPANY.
  getEmployeeDB: function(req, res) {
    Logger.log("call: getEmployeeDB", controller + "getEmployeeDB");

    Employee.find({}).exec(function(err, rec) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.view("pages/employee/listCompany", { recList: rec });
    });
  },

  MBRcall: function(req, res) {
    Logger.log("call: MBRcall", controller + "MBRcall");

    Logger.log(
      "Checking for values in the JSON response from the company server",
      controller + "MBRcall"
    );
  },

  supplyMBRinfo: function(req, res) {
    Logger.log("call: supplyMBRinfo", controller + "supplyMBRinfo");
    var employeeId = req.param("empID");
    var address = req.param("address");
    var mbrID = req.param("mbrID");
    var request = require("request");
    Employee.find({ empID: employeeId }).exec(function(err, result) {
      var data = result[0];
      var name = data.fullName;
      var tenure = data.tenure;
      var salary = data.salary;
      var email = data.email;

      if (err) {
        res.send(500, {
          error:
            "Database Error when retrieving info about employee with ID " +
            employeeId
        });
      }
      var endpointURL =
        address +
        "?name=" +
        name +
        "&email=" +
        email +
        "&id=" +
        mbrID +
        "&tenure=" +
        tenure +
        "&salary=" +
        salary;
      request.get(
        {
          url: endpointURL
        },
        function(error, response, body) {
          if (error) {
            Logger.log("Something went wrong calling url" + endpointURL, controller + "supplyMBRinfo");
          } else {
            Logger.log("body,response,enpoint=>"+body+response+endpointURL, controller + "supplyMBRinfo");
            var bodyObject = JSON.parse(body);
            var status = bodyObject.status;

            if ("success" == status) {
              // res.send("<h2><center>We have successfully forwarded your application.</h2> <h2><center>Please check MBR portal for the application progress.</center></center></h2>");
              res.send(
                "We have successfully forwarded your application. Please check MBR portal for the application progress. "
              );
            } else {
              // res.send("<h2>We have forwarded your application, but some error happened on the MBR side.</h2> <h2> MBR response is: "+body + "</h2>");
              res.send(
                "We have forwarded your application, but some error happened on the MBR side. MBR response is: " +
                  body
              );
            }
          }
        }
      );
    });
  },
  employeeRemoveSession: function(req, res) {
    var email = req.param("email");
    Employee.findOne({ email: email }).exec(function(err, user) {
      if (err) {
        res.send(err);
      } else {
        if (!user) {
          // Logger("Email is not registered", "MbrServiceController.mbrLogin");
          res.send({ status: "unauthentic", error: "Invalid email" });
        } else {
          //pending update here
          Employee.update({ email: email })
            .set({
              token: ""
            })
            .exec(function(err) {
              if (err) {
                Logger(err, "Employee");
                res.send(err);
              } else {
                res.send({ Status: "success" });
              }
            });
        }
      }
    });
  },

  authenticateUser: function(req, res) {
    Logger.log("call: authenticateUser", controller + "authenticateUser");
    var password = req.body.password;
    var email = req.body.email;
    var usernameCipher = crypto.createCipher(algorithm, key);
    var token =
      usernameCipher.update(email, "utf8", "hex") + usernameCipher.final("hex");
    Employee.find({ email: email }).exec(function(err, result) {
      if (err) {
        Logger.log("Database Error when retrieving info about employee with ID ", controller + "authenticateUser");
        res.send(500, {
          error:
            "Database Error when retrieving info about employee with email " +
            email
        });
      }
      if (0 == result.length) {
        return res.send({ invalid: "invalid" });
      } else {
        var data = result[0];
      }
      var decipher = crypto.createDecipher(algorithm, key);
      var decrypted =
        decipher.update(data.password, "hex", "utf8") + decipher.final("utf8");
      if (password === decrypted) {
        Logger.log("Authentic user", controller + "authenticateUser");
        // code for the token to the DB.
        Employee.update({ email: data.email })
          .set({
            token: token
          })
          .toPromise(function(err) {
            if (err) {
              res.send(err);
            } else {
              res.send({ Status: "success" });
            }
          });
        return res.send({ empID: data.empID, token: data.token });
      } else {
        Logger.log("Not authentic user", controller + "authenticateUser");
        return res.send({ invalid: "invalid" });
      }
    });
  }
};
