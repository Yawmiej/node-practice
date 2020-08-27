const express = require('express');
const tourController = require('../controllers/tourController');

const toursRouter = express.Router();

toursRouter.param('id', tourController.checkID);

//Define the routes
toursRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
toursRouter.route('/:id').get(tourController.getTour);

module.exports = toursRouter;
