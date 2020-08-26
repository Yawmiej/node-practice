const express = require('express');
const morgan = require('morgan');

//modules
const toursRouter = require('./routes/tours');
const usersRouter = require('./routes/users');

const app = express();

app.use(morgan('dev'));

//Middleware to allow request body data
app.use(express.json());

//Mount the route handlers in middleware
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
