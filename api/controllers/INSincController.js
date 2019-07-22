/**
 * INSincController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var Logger = require('../../assets/custom/LoggerService');

module.exports = {
  
    checkInsuranceAvailability: function(req, res) {

        Logger("call: mbrAddcheckInsuranceAvailabilityUser", "INSincController.checkInsuranceAvailability");

        var mortId = req.param("MortId");
        var mlsID = req.param("MlsID");
        var appraisalValue = req.param("appraisalValue");
        var applicantName = req.param("applicantName");

        if(!mortId || !mlsID || !appraisalValue || !applicantName) {
            res.send({ status: "fail", error: "Mortgage ID, or property ID MlsID, or appraisal value, or applicant name is empty." })
        }

        if(appraisalValue > 1000000) {
            res.send({ status: "pending", reason: "Appraisal value is higher than 1000000." });
        }  

        var request = require('request');

        url = 'http://localhost:1337/mbr/confirm-insurance-availability?' + 'MortId=' + mortId + '&MlsID=' + mlsID + 
                '&isInsurable=' + false + '&insuredValue=' + 0 + '&deductable=' + 0 + 
                '&applicantName=' + applicantName

        if(appraisalValue < 50000) {
            request.get({
                url: url
                }, function(error) {
                if (error) {
                    Logger(error, "INSincController.checkInsuranceAvailability");
                } else {
                    res.send({ status: "declined", reason: "Appraisal value is less than 50000." });
                }
            });
        }  

        
        var insuredValue = appraisalValue < 500000? appraisalValue : appraisalValue*0.85;
        var deductable = insuredValue*0.02;

        // https://stackoverflow.com/questions/30523872/make-a-http-request-in-your-controller-sails-js

        url = 'http://localhost:1337/mbr/confirm-insurance-availability?' + 'MortId=' + mortId + '&MlsID=' + mlsID + 
                '&isInsurable=' + true + '&insuredValue=' + insuredValue + '&deductable=' + deductable + 
                '&applicantName=' + applicantName;
        if(appraisalValue >= 50000) {
            request.get({
                url: url
                }, function(error) {
                if (error) {
                    Logger(error, "INSincController.checkInsuranceAvailability");
                } else {
                    res.send({ status: "approved", reason: "Appraisal value is higher than 50000." });
                }
            });
        }
    }
};

