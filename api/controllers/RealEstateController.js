 /**
 * RealEstateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var crypto = require('crypto');
var assert = require('assert');
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var key = 'cloudComputing';
var Logger = require('../../assets/custom/LoggerService');
var controller = "RealEstateController.";

module.exports = {

    requestAppraisal: function (req, res) {

        Logger.log("call: requestAppraisal", controller + "requestAppraisal");

        var name = req.param("name");
        var MortID = req.param("MortID");
        var MlsID = req.param("MlsID");
        
        RealEstate.create({
            fullName: name,
            MlsID : MlsID,
            MortID : MortID
        })
        .exec(function (err) {
            if (err) {
                var errCode = err.code;
                if (errCode == "E_UNIQUE") {
                  Logger.log("E_UNIQUE", controller + "requestAppraisal");
                    return res.send({ error: "MortID already exist", status: "fail" });
                }  else {
                    return res.send({ error: message, status: "fail" });
                }
            } else {
                Logger.log("Log real estate appraisal submited", controller + "requestAppraisal");
                res.send({ status: "Success" });
            }
        });
    },
    // SHOW DATABASE OF COMPANY.
    getREDB:function(req,res){

        Logger.log("call: getREDB", controller + "getREDB");

        RealEstate.find({}).exec(function(err,rec){
            if(err){
                res.send(500,{error:'Database Error'});
            }
        res.view('pages/realEstate/listRE',{recList:rec})
        });
    },

    fetchAppraisals: function (req, res) {

        Logger.log("call: fetchAppraisals", controller + "fetchAppraisals");

        RealEstate.find()
        .exec(function (err,Appraisals) {
            if (err) {
                //Log error message: failed to fetch list of appraisals
                Logger.log("Log error message: failed to fetch list of appraisals", controller + "fetchAppraisals");
            } else {
                //Log appraisals fetched
                Logger.log("Log appraisals fetched", controller + "fetchAppraisals");
                res.locals.layout = "layouts/realEstate/layout.ejs";
                return res.view('pages/realEstate/AppraisalList',{Appraisals:Appraisals});
            }
        });
    },

    deleteApplication: function (req,res) { 
        
        Logger.log("call: deleteApplication", controller + "deleteApplication");

        var MortID = req.param("MortID");
        RealEstate.destroy({MortID:MortID}).meta({fetch: true}).exec(function(err,data)
        {
            if(err)
            {
                Logger.log("Unsuccessful in Updating Real Estate Database", controller + "deleteApplication");
                return res.send({error:"Unsuccessful in Updating Real Estate Database",status:"fail"})
            }
            else
            {
                Logger.log("Successfully sent data to Insurace", controller + "deleteApplication");
                return res.send({status:"Successful"});
            }
        })
       
    },

    appraiserSignUp: function (req, res) {

        Logger.log("call: appraiserSignUp", controller + "appraiserSignUp");

        var email = req.param("email");
        var password = req.param("password");
        var cipher = crypto.createCipher(algorithm, key);  
        password = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
        Appraiser.create({
            email : email,
            password : password
        })
        .exec(function (err) {
            if (err) {
                var errCode = err.code;
                if (errCode == "E_UNIQUE") {
                    Logger.log("Log error message;E_UNIQUE", controller + "appraiserSignUp");
                    res.send({ error: "Email already exist", status: "fail" });
                }  else {
                    Logger.log("Failed in signing up", controller + "appraiserSignUp");
                    res.send({ error: message, status: "fail" });
                }
            } else {
                    Logger.log("Log real estate appraiser account created", controller + "appraiserSignUp");
                res.send({ status: "Success" });
            }
        });
    },


    appraiserLogin: function (req, res) {

        Logger.log("call: appraiserLogin", controller + "appraiserLogin");

        var email = req.param("email");
        var password = req.param("password");

        Appraiser.findOne({ email: email })
            .exec(function (err, appraiser) {
                if (err) {
                    return res.send(err);
                } else {
                    if (!appraiser) {
                      Logger.log("Error in appraiserLogin", controller + "appraiserLogin");
                      return res.send({ status: "unauthentic", error: "Appraiser is not registered" })
                    } else {
                        var decipher = crypto.createDecipher(algorithm, key);
                        var decrypted = decipher.update(appraiser.password, 'hex', 'utf8') + decipher.final('utf8');
                        if (password == decrypted) {
                            return res.send({ status: "authentic" })
                        } else {
                            Logger.log("Error in appraiserLogin", controller + "appraiserLogin");
                            return res.send({ status: "unauthentic", error: "Email-Password combination does not exist" })
                        }
                    }
                }
            })
    },



};

