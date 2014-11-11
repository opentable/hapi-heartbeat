var async = require("async"),

    getStatus = function(dependenciesStatusCode){
        return dependenciesStatusCode < 500;
    },

    checkDependencies = function(server, path, headers, callback){
        server.inject({ url: path, headers: headers}, function(result){
            callback(
                result.statusCode
            );
        });
    },

    heartbeat = function(servers, config, callback){
        var results = [];

        async.forEach(servers, function(server, done){
            checkDependencies(server, config.liveness, config.headers, function(statusCode){
                results.push(getStatus(statusCode));
                done();
            });
        }, function(){
            var failed = results.filter(function(i){ return i === false; }).length > 0;
            callback({ code: failed ? 503 : 200});
        });
    };

module.exports = {
    heartbeat: heartbeat
};