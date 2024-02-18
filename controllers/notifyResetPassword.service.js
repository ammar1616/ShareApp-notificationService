const httpStatus = require('http-status-codes').StatusCodes;
const sendResetPasswordEmail = require('../helpers/sendResetPasswordEmail.service');
const websocketNotifier = require('../helpers/websocketNotifier.service');

const notifyResetPassword = async (req, res) => {
  const { user, generatedPassword } = req.body;

  websocketNotifier.sendNotification(
    user,
    'Your password has been reset. Please check your email for the temporary password.'
  );

  const response = await sendResetPasswordEmail(
    user,
    generatedPassword
  );

  if (response.status == true) {
    return res.status(httpStatus.OK).json({ message: response.message });
  } else if (response.status == false) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: response.error });
  }
};

module.exports = notifyResetPassword;
