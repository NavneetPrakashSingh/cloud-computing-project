/**
 * MbrServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var crypto = require('crypto');
var assert = require('assert');
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var key = 'cloudComputing';
var Logger = require('../../assets/custom/LoggerService');
var controller = "MbrServiceController.";

module.exports = {


    fetchApplication: function (req,res) {
        Properties.find()
        .exec(function (err,Properties) {
            if (err) {
                //Log error message: failed to fetch list of appraisals
                var log = "Failed to fetch list of properties";
                var timestamp = new Date().getTime();
                var server = "Properties";
                Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                });
            } else {
                //Log appraisals fetched
                var log = "Log appraisals fetched";
                var timestamp = new Date().getTime();
                var server = "Properties";
                res.locals.layout = "layouts/mbr/layout.ejs";
                return res.view('pages/mbr/signup',{Properties:Properties});
            }
        });
    },


    mbrAddUser: function (req, res) {

        Logger.log("call: mbrAddUser", controller + "mbrAddUser");

        var name = req.param("name");
        var email = req.param("email");
        var password = req.param("password");

        var cipher = crypto.createCipher(algorithm, key);
        var password = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');

        var usernameCipher = crypto.createCipher(algorithm, key);
        var token = usernameCipher.update(name, 'utf8', 'hex') + usernameCipher.final('hex');
        var address = req.param("address");
        var phoneNumber = req.param("phoneNumber");
        var tenure = req.param("tenure");
        var salary = req.param("salary");
        var mortgageValue = req.param("mortgageValue");
        var mlsID = req.param("mlsID"); // property ID

        MbrUser.create({
            Name: name,
            Email: email,
            Password: password,
            Address: address,
            Phone_Number: phoneNumber,
            Tenure: tenure,
            Salary: salary,
            Status: "Waiting for employee response",
            MortgageValue: mortgageValue,
            MlsID: mlsID,
            Token:token
        })
            .exec(function (err) {
                if (err) {
                    var errCode = err.code;
                    if (errCode == "E_UNIQUE") {
                        var log = "Error in Creating user";
                        Logger.log(log, controller + "mbrAddUser");
                        res.send({ error: "User already exist", status: "fail" });
                    }  else {
                        res.send({ error: err, status: "fail" });
                        var log = "Error in Creating user in else case";
                        Logger.log(log, controller + "mbrAddUser");
                        res.send({ error: message, status: "fail" });
                    }
                } else {
                    res.send({ status: "Success",token: token });
                }
            });
    },
    // SHOW DATABASE OF MBR.
    getMBRDB:function(req,res){
      MbrUser.find({}).exec(function(err,rec){

        if(err){
            res.send(500,{error:'Database Error'});
        }
      res.view('pages/mbr/listMBR',{recList:rec})
      });
    },

    mbrRemoveSession: function( req,res){
        var email = req.param("email");
        MbrUser.findOne({ Email: email })
        .exec(function (err, user) {
            if (err) {
                res.send(err);
            } else {
                if (!user) {
                    // Logger("Email is not registered", "MbrServiceController.mbrLogin");
                    res.send({ status: "unauthentic", error: "Invalid email" })
                } else {

                    //////update here
                    MbrUser.update({ Email: email }).set({
                        Token: ""
                    }).exec(function (err) {
                        if (err) {
                            Logger(err, "MBR");
                            res.send(err);
                        }else{
                            res.send({Status:"success"});
                        }
                    })
                }
            }

        })
    },

    mbrLogin: function (req, res) {

        Logger.log("call: mbrLogin", controller + "mbrLogin");

        var email = req.param("email");
        var password = req.param("password");



        MbrUser.findOne({ Email: email })
            .exec(function (err, user) {
                if (err) {
                    Logger.log(err, controller + "mbrLogin");
                    res.send(err);
                } else {
                    if (!user) {
                        Logger.log("Email is not registered", controller + "mbrLogin");
                        res.send({ status: "unauthentic", error: "Email is not registered" })
                    } else {

                        // console.log(user);
                        // console.log(user.)
                        var decipher = crypto.createDecipher(algorithm, key);
                        var decrypted = decipher.update(user.Password, 'hex', 'utf8') + decipher.final('utf8');

                        var nameCipher = crypto.createCipher(algorithm, key); 
                        var token = nameCipher.update(user.Email, 'utf8', 'hex') + nameCipher.final('hex');

                        if (password == decrypted) {

                            //update value here
                            MbrUser.update({ Email: email }).set({
                                Token: token
                            }).exec(function (err) {
                                if (err) {
                                    Logger(err, "MBR");
                                }else{
                                    console.log("Token updated successfully");
                                }
                            })

                            res.send({ status: "authentic" , token:token})
                        } else {
                            Logger.log("Email-Password combination does not exist", controller + "mbrLogin");
                            res.send({ status: "unauthentic", error: "Email-Password combination does not exist" })
                        }
                    }
                }

            })
    },


    mbrgetToken: function (req, res) {

        Logger.log("call: mbrgetToken", controller + "mbrgetToken");

        var email = req.param("email");

        MbrUser.findOne({ Email: email })
            .exec(function (err, user) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({"token":user.Token});
                }
            })
    },


    mbrStatus: function (req, res) {

        Logger.log("call: mbrStatus", controller + "mbrStatus");

        var email = req.param("email");

        MbrUser.findOne({ Email: email })
            .exec(function (err, user) {
                if (err) {
                    Logger.log(err, controller + "mbrStatus");
                    res.send(err);
                } else {
                    res.send(user)
                }
            })
    },

    confirmEmploymentStatus: function (req, res) {

        Logger.log("call: confirmEmploymentStatus", controller + "confirmEmploymentStatus");

        var name = req.param("name");
        var email = req.param("email");
        var tenure = req.param("tenure");
        var salary = req.param("salary");
        var id = req.param("id");

        MbrUser.findOne({ id: id })
            .exec(function (err, user) {
                if (err) {
                    Logger.log(err, controller + "confirmEmploymentStatus");
                    res.send(err);
                } else {
                    if (!user) {
                        Logger.log("Invalid id", controller + "confirmEmploymentStatus");
                        return res.send({ status: "fail", error: "Invalid id" })
                    }
                    if (name == user.Name && email == user.Email && tenure == user.Tenure && salary == user.Salary) {
                        MbrUser.update({ id: id }).set({
                            Status: "Application Accepted"
                        }).exec(function (err) {
                            if (err) {
                                Logger.log(err,  controller + "confirmEmploymentStatus");
                                res.send(err);
                            }
                        })
                    } else {
                        MbrUser.update({ id: id }).set({
                            Status: "Employee detail did not match, send again"
                        }).exec(function (err) {
                            if (err) {
                                res.send(err);
                            }
                        })
                    }
                    res.send({ status: "success" })
                }
            })
    },

    mbrConfirmInsuranceAvailability: function(req, res) {

        Logger.log("call: mbrConfirmInsuranceAvailability", controller + "mbrConfirmInsuranceAvailability");

        var mortId = req.param("MortId");
        var mlsID = req.param("MlsID");
        var isInsurable = req.param("isInsurable");
        var insuredValue = req.param("insuredValue");
        var deductable = req.param("deductable");
        var applicantName = req.param("applicantName");

        MbrUser.findOne({ id: mortId })
            .exec(function (err, user) {
                if (err) {
                    Logger.log(err, controller + "mbrConfirmInsuranceAvailability");
                    res.send(err);
                } else {
                    if (!user || user.MlsID != mlsID || user.Name != applicantName) {
                        return res.send({ status: "fail", error: "Invalid mortgage ID, or property ID MlsID, or user name." })
                    }
                    if (isInsurable) {
                        MbrUser.update({ id: mortId }).set({
                            IsInsurable: true,
                            InsuredValue: insuredValue,
                            Deductable: deductable
                        }).exec(function (err) {
                            if (err) {
                                Logger.log(err, controller + "mbrConfirmInsuranceAvailability");
                                res.send(err);
                            }
                        })
                    } else {
                        MbrUser.update({ id: mortId }).set({
                            IsInsurable: false
                        }).exec(function (err) {
                            if (err) {
                                Logger.log(err, controller + "mbrConfirmInsuranceAvailability");
                                res.send(err);
                            }
                        })
                    }
                    res.send({ status: "success" })
                }
            })
    }
};

