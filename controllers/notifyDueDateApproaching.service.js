const httpStatus = require('http-status-codes').StatusCodes;
const sendDueDateApproachingEmail = require('../helpers/sendDueDateApproachingEmail.service');
const websocketNotifier = require('../helpers/websocketNotifier.service');

const notifyDueDateApproaching = async (req, res) => {
  const { borrowerEmail, borrowerName, itemName } = req.body;

  websocketNotifier.sendNotification(
    borrowerEmail,
    `Reminder: Due Date Approaching for ${itemName} Borrowed Item`
  );

  const response = await sendDueDateApproachingEmail(
    borrowerEmail,
    borrowerName,
    itemName
  );

  if (response.status == true) {
    return res.status(httpStatus.OK).json({ message: response.message });
  } else if (response.status == false) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: response.error });
  }
};

module.exports = notifyDueDateApproaching;
