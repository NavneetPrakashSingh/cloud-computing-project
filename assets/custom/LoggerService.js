
module.exports.log = function(log, location) {
    var timestamp = new Date().getTime();
    Logger.create({time:timestamp,log:log, location:location}).exec(function(err) {});
}