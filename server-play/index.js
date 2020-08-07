const http = require('http');
const fs = require('fs');

const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const overview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const replaceTemplate = (template = '', product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITIY%}/g, product.quantity);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }

  return output;
};

const server = http.createServer((req, res) => {
  const pathname = req.url;

  //Overview Page
  if (pathname === ('/' || '/overview')) {
    const cards = dataObj.map((el) => replaceTemplate(card, el)).join('');
    const output = overview.replace('{%PRODUCT_CARDS%}', cards);

    res.writeHead(200, {
      'Content-Type': 'text-html',
    });

    res.end(output);

    //Product Page
  } else if (pathname === '/product') {
    res.end(product);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);

    //Not Found
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
