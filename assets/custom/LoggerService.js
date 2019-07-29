
module.exports.log = function(log, source) {
    var timestamp = new Date().getTime();
    Logger.create({time:timestamp,log:log,source:source}).exec(function(err) {});
}