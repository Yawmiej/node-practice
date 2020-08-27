const express = require('express');
const morgan = require('morgan');

//modules
const toursRouter = require('./routes/tours');
const usersRouter = require('./routes/users');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Mount the route handlers in middleware
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
