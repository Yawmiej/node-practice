const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplates');

const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const overview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathname = req.url;
  const urlParams = url.parse(pathname, true);

  //Overview Page
  if (pathname === ('/' || '/overview')) {
    const cards = dataObj.map((el) => replaceTemplate(card, el)).join('');
    const output = overview.replace('{%PRODUCT_CARDS%}', cards);

    res.writeHead(200, {
      'Content-Type': 'text-html',
    });

    res.end(output);

    //Product Page
  } else if (pathname === `/product${urlParams.search}`) {
    const { id } = urlParams.query;
    const productData = dataObj.find((data) => data.id === Number(id));
    const output = replaceTemplate(product, productData);

    res.end(output);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);

    //Not Found
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
