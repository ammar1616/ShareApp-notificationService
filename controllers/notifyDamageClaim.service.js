const httpStatus = require('http-status-codes').StatusCodes;
const sendDamageClaimEmail = require('../helpers/sendDamageClaimEmail.service');
const websocketNotifier = require('../helpers/websocketNotifier.service');

const notifyDamageClaim = async (req, res) => {
  const { borrowerEmail, borrowerName, lenderName, itemName } = req.body;

  websocketNotifier.sendNotification(
    borrowerEmail,
    `Urgent - Damage Claim for ${itemName} Reported`
  );

  const response = await sendDamageClaimEmail(
    borrowerEmail,
    borrowerName,
    lenderName,
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

module.exports = notifyDamageClaim;
