const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (val * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Tour name or price missing',
    });
  }
  next();
};

//Controllers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: tours,
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((tor) => tor.id === Number(id));
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

exports.createTour = (req, res) => {
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
