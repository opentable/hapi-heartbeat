describe('heartbeat tests', function(){
    var should = require('should'),
        provider = require('../lib/provider'),
        servers = [{
            inject: function(options, callback){
                callback({ statusCode: 200 });
            },
            log: function(){}
        }],
        badservers = [{
            inject: function(options, callback){
                callback({ statusCode: 500 });
            },
            log: function(){}
        }];

    it('should register the route', function(){
        var p = require('../index.js'),
            r = [],
            plugin = {
              route: function(route) {
                  r.push(route);
              }
            };

        p.register(plugin, {}, function(){});
        r.length.should.eql(1);
        r[0].path.should.eql('/heartbeat');
    });

    it('should return 503 when the liveness check fails', function(done){
        provider.heartbeat(badservers, {
            liveness: '/my/app/123',
        }, function(result){
            result.code.should.eql(503);
            done();
        });
    });
});