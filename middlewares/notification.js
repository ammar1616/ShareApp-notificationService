const httpStatus = require('http-status-codes').StatusCodes;

const notification = (isEnabled) => {
  return (req, res, next) => {
    if (isEnabled == 'false') {
      console.log('Notifications are disabled');
      return res
        .status(httpStatus.ACCEPTED)
        .json({ message: 'Notifications are disabled' });
    }

    next();
  };
};

module.exports = notification;
