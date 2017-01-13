var service = require('./lib/provider');

exports.register = function(plugin, options, next){
    plugin.route(
        {
            method: "GET",
            path: options.route || '/heartbeat',
            config: {
                handler: function(request, reply) {
                    service.heartbeat(request.server, options, function(isalive){
                        reply().code(isalive ? 200 : 503).type(options.contentType);
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
