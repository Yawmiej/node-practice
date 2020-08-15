const express = require('express');

const usersRouter = express.Router();

const handleUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'User routes not implemented' });
};

usersRouter.route('/').get(handleUser);

module.exports = usersRouter;
