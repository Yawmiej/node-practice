const http = require('http');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathname = req.url;

  if (pathname === ('/' || '/overview')) {
    res.end('this is overview bissssh');
  } else if (pathname === '/product') {
    res.end('WHatta Pradact!');
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
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
