/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var crypto = require('crypto');
var assert = require('assert');
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var key = 'cloudComputing';

module.exports = {

    create:function(req, res, next){
        var name = req.body.name;
        var email = req.body.email;
        Employee.find({
            or : [
                { name:name },
                { email:email }
            ]
        })
        .exec(function (err, employees){
            if (err) {
                return res.negotiate(err);
            }
            if (employees.length) {
                return res.send({ invalid: 'invalid' });

            } else {
                var name = req.body.name;
                var email = req.body.email;
                var salary = req.body.salary;
                var password = req.body.password;
                var cipher = crypto.createCipher(algorithm, key);
                password = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
                var tenure = req.body.tenure;
                var empID = Math.floor(Math.random() * 200);
                 Employee.create({
                    empID: empID,
                    email: email,
                    fullName: name,
                    salary: salary,
                    tenure: tenure,
                    password:password
               }).exec(function(req_err) {
                if (req_err) {
                  var log = "Database Error";
                  var timestamp = new Date().getTime();
                  var server = "Employee"
                  Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                      if(err){
                          return res.status(500).send({error:'Logging Error'});
                      }
                      return res.status(500).send({ error: req_err });
                  });
                }
            });
        }
           var log = "Employer profile completed.";
          var timestamp = new Date().getTime();
          var server = "Company"
          Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
            if(err){
                  return res.send(500,{error:'Logging Error'});
            }
            // return res.view("pages/employee/SignIn");
            return res.send(200,{message:"Profile created successfully!"});
          });
        });

    },

    // SHOW DATABASE OF COMPANY.
    getEmployeeDB:function(req,res){
      Employee.find({}).exec(function(err,rec){

        if(err){
            res.send(500,{error:'Database Error'});
        }
       res.view('pages/employee/listCompany',{recList:rec})
      });
    },

    MBRcall: function(req, res) {
    var log = "Checking for values in the JSON response from the company server";
        var timestamp = new Date().getTime();
        var server = "MBR"
        Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                    if(err){
                res.send(500,{error:'Database Error'});
            }
        });
    },

    supplyMBRinfo:function(req, res) {
        console.log("inside supply MBR infor");
        var employeeId = req.param('empID');
        var address = req.param('address');
        var mbrID = req.param('mbrID');
        console.log(mbrID);
        console.log(address);
        var request = require('request');
        Employee.find({empID: employeeId}).exec(function(err, result) {
            var data = result[0];
            console.log("hello my frined",data);
            var name = data.fullName;
            var tenure = data.tenure;
            var salary = data.salary;
            var email = data.email;

            if (err) {
            res.send(500, { error: "Database Error when retrieving info about employee with ID " + employeeId});
            }
            var endpointURL = address+"?name="+name+"&email="+email+"&id="+mbrID+"&tenure="+tenure+"&salary="+salary;
            console.log(endpointURL);
            var log = "MBR id = "+mbrID;
            var timestamp = new Date().getTime();
            var server = "Company";
            // Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
            //             if(err){
            //         res.send(500,{error:'Database Error'});
            //     }
            // })
            request.get({
                url: endpointURL
            },function(error, response, body) {

                if (error) {
                var log = "Something went wrong";
                var timestamp = new Date().getTime();
                var server = "Company"
                Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                    if(err){
                        res.send(500,{error:'Database Error'});
                    }
                });
                }
                else {
                var log = "body,response,enpoint=>"+body+response+endpointURL;
                var timestamp = new Date().getTime();
                var server = "Company"
                Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                                    if(err){
                        res.send(500,{error:'Database Error'});
                    }
                });

                var bodyObject = JSON.parse(body);
                var status = bodyObject.status;

                if("success" == status) {
                   // res.send("<h2><center>We have successfully forwarded your application.</h2> <h2><center>Please check MBR portal for the application progress.</center></center></h2>");
                    res.send("We have successfully forwarded your application. Please check MBR portal for the application progress. ")
                }
                else {
                    // res.send("<h2>We have forwarded your application, but some error happened on the MBR side.</h2> <h2> MBR response is: "+body + "</h2>");
                    res.send("We have forwarded your application, but some error happened on the MBR side. MBR response is: "+body);
                }
                }
            })
        });
    },

    authenticateUser: function (req, res) {
        var password=req.body.password;
        var email = req.body.email;
        Employee.find({email: email}).exec(function(err, result) {
            if (err) {
                var log = "Database Error when retrieving info about employee with ID "
                var timestamp = new Date().getTime();
                var server = "Company"
                Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                    if(err){
                        res.send(500,{error:'Logging Error'});
                    }
                });
                res.send(500, { error: "Database Error when retrieving info about employee with email " + email});
            }
            if(0 == result.length) {
                return res.send({ invalid: 'invalid' });
            }
            else
            {
                var data = result[0];
            }



            console.log(data.password);
            var decipher = crypto.createDecipher(algorithm, key);
            var decrypted = decipher.update(data.password, 'hex', 'utf8') + decipher.final('utf8');
            if(password === decrypted){
                var log = "Authentic user."
                var timestamp = new Date().getTime();
                var server = "Company"
                Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                                    if(err){
                        res.send(500,{error:'Logging Error'});
                    }
                });
                //res.locals.layout = "layouts/employee/layout.ejs";
                //res.view('pages/employee/MortgageInfoSupply',{empID:data.empID});
                return res.send({empID:data.empID});

            }
            else{
                var log = "Not authentic user."
                var timestamp = new Date().getTime();
                var server = "Company"
                Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                    if(err){
                        res.send(500,{error:'Database Error'});
                    }
                });
                return res.send({ invalid: 'invalid' });
            }
        })
    },
};



