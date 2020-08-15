const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

//Middleware to allow request body data
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: tours,
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const handleUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'User routes not implemented' });
};

//Define the route groups
const toursRouter = express.Router();
const usersRouter = express.Router();

//Mount the route handlers in middleware
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

//Define the routes
toursRouter.route('/').get(getAllTours).post(createTour);
toursRouter.route('/:id').get(getTour);
usersRouter.route('/').get(handleUser);

const port = 4000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
