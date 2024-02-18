const axios = require('axios');
const httpStatus = require('http-status-codes').StatusCodes;

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    console.warn('Access denied. No token provided');
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ error: 'Access denied. No token provided' });
  }

  try {
    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}/auth/token`,
      null,
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    if (response.data.valid) {
      req.user = response.data.user;
      next();
    } else {
      console.warn('Token invalid or expired');
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: 'Invalid or expired token' });
    }
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error verifying token' });
  }
};
