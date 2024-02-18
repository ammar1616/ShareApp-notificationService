const sendBorrowerRequestEmail = require('../helpers/sendBorrowerRequestEmail.service');
const httpStatus = require('http-status-codes').StatusCodes;
const websocketNotifier = require('../helpers/websocketNotifier.service');

const notifyBorrowingRequest = async (req, res) => {
  const { lenderEmail, lenderName, borrowerName, itemName } = req.body;

  websocketNotifier.sendNotification(
    lenderEmail,
    `New Borrowing Request: ${itemName} from ${borrowerName} - Action Required`
  );

  const response = await sendBorrowerRequestEmail(
    lenderEmail,
    lenderName,
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

module.exports = notifyBorrowingRequest;
