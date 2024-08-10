const axios = require('axios');
const { UnauthenticatedError } = require('../errors');

const authenticateUserServiceRequest = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Invalid Token');
    }

    try {
      await axios.post('http://localhost:3001/api/v1/auth/jwt/authenticate', {
        token: token,
      });
    } catch (error) {
      throw new UnauthenticatedError(error.response.data.msg);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateUserServiceRequest;
