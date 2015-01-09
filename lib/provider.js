var getStatus = function(dependenciesStatusCode){
        return dependenciesStatusCode < 500;
    },

    checkDependencies = function(server, path, headers, callback){
        server.inject({ url: path, headers: headers}, function(result){
            callback(
                result.statusCode
            );
        });
    },

    heartbeat = function(server, config, callback){
        checkDependencies(server, config.liveness, config.headers, function(statusCode){
            callback(getStatus(statusCode));
        });
    };

module.exports = {
    heartbeat: heartbeat
};
