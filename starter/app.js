const express = require('express');
const fs = require('fs');

const app = express();

//Middleware to allow request body data
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: tours,
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;
  const tour = tours.find((tour) => tour.id === Number(id));

  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
    return;
  }

  res.status(404).json({
    status: 'fail',
    message: 'tour not found',
  });
});

app.post('/api/v1/tours', (req, res) => {
  const postId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: postId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
});

const port = 4000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
