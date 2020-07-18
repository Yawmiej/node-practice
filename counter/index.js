'use strict';

const port = 3000,
  http = require('http'),
  url = require('url'),
  pagehit = new (require('./lib/pagehit'))(),
  httpResponse = require('./lib/httpresponse');

//new server

http
  .createServer((req, res) => {
    let count = pagehit.count(req);

    if (!count) {
      httpResponse({ res, status: 400, content: 'No referrer' });
      return;
    }
    let uri = url.parse(req.url).pathname;
    switch (uri) {
      case '/counter.js':
        httpResponse({
          res,
          mime: 'application/javascript',
          content: `document.write('<span className="pagecounter">${count}</span>')`,
        });
        break;
      default:
        httpResponse({ res, status: 404, content: 'Not found' });
        break;
    }
  })
  .listen(port);

console.log(`Running on port ${port}`);
