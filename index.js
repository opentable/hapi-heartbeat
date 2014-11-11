var service = require('./lib/provider');

exports.register = function(plugin, options, next){
    plugin.route(
        {
            method: "GET",
            path: "/heartbeat",
            config: {
                handler: function(request, reply) {
                    service.lbstatus(plugin.servers, options, function(result){
                        reply().code(result.code);
                    });
                }
            }
        }
    );

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};