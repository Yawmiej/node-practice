const http = require('http');

const server = http.createServer((req, res) => {
  const pathname = req.url;

  if (pathname === ('/' || '/overview')) {
    res.end('this is overview bissssh');
  } else if (pathname === '/product') {
    res.end('WHatta Pradact!');
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'x-prrrede': 'predicting sheeet',
    });

    res.end(
      "<h1 style='color: red;'>Nothing to see here, Fuck the hell off!</h1>"
    );
  }
});

server.listen(5050, '127.0.0.1', () => {
  console.log('Listening on port 5050');
});
