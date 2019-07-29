/**
 * LoggerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    showLogs:function(req,res){
        Logger.find({}).exec(function(err,log){
            if(err){
                res.send(500,{error:'Database Error'});
            }
            res.view('pages/logs',{logList:log})
        });
    }

};

