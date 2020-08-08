const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'This is a new Dawn', app: 'Natours' });
});

const port = 4000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
