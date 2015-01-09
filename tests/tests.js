describe('heartbeat tests', function(){
    var should = require('should'),
        provider = require('../lib/provider'),
        server = {
            inject: function(options, callback){
                callback({ statusCode: 200 });
            },
            log: function(){}
        },
        badserver = {
            inject: function(options, callback){
                callback({ statusCode: 500 });
            },
            log: function(){}
        };

    it('should register the route', function(){
        var p = require('../index.js'),
            r = [],
            plugin = {
              route: function(route) {
                  r.push(route);
              }
            };
        p.register(plugin, { route: '/heartbeat' }, function(){});
        r.length.should.eql(1);
        r[0].path.should.eql('/heartbeat');
    });

    it('should register the route /heartbeat if non specified', function(){
        var p = require('../index.js'),
            r = [],
            plugin = {
              route: function(route) {
                  r.push(route);
              }
            };
        p.register(plugin, {  }, function(){});
        r.length.should.eql(1);
        r[0].path.should.eql('/heartbeat');
    });

    it('should return false when the liveness check fails', function(done){
        provider.heartbeat(badserver, {
            liveness: '/my/app/123',
            route: '/heartbeat'
        }, function(result){
            result.should.eql(false);
            done();
        });
    });
});
