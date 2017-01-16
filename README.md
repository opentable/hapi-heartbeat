#Hapi hearbeat
[![Build Status](https://travis-ci.org/opentable/hapi-heartbeat.png?branch=master)](https://travis-ci.org/opentable/hapi-heartbeat) [![NPM version](https://badge.fury.io/js/hapi-heartbeat.png)](http://badge.fury.io/js/hapi-heartbeat) ![Dependencies](https://david-dm.org/opentable/hapi-heartbeat.png)

Shared code for the `heartbeat` endpoint. 


Installation:

```npm install hapi-heartbeat```

Usage:

```
var server = hapi.createServer();

server.pack.require("hapi-heartbeat",
  {
    contentType: 'text/html',  // sets 'content-type' response header; optional (none by default)
    liveness: '/my/api/123',
    route: '/heartbeat' (optional: default to /heartbeat)
    headers: {
    // optional headers to apply when making the liveness check
      'accept-language': 'en-US'
    },
  },
  function (err){
    if(err){
      throw err;
    }
  }
);
```

Response Codes:
- 200
- 503

Notes:

- Supports pack servers as well as single instances
- Supports hapi v5+
