const express = require('express');
require('express-async-errors');
const cors = require('cors');
const notification = require('../routes/notification.route.js');
const error = require('../middlewares/error');

module.exports = (app) => {
  app.use(express.json());
  app.use(cors({ origin: true }));
  app.use('/notification-service', notification);
  app.use(error);
};
