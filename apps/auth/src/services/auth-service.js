const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('../errors/unauthenticated');

const generateJwtToken = ({ payload }) => {
  const expiresIn = process.env.JWT_EXPIRATION_TIME || '1h';
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: expiresIn,
  });
  return token;
};

const authenticateJwtToken = (token) => {
  if (!token) {
    throw new UnauthenticatedError('Authorization Invalid');
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return payload;
};

module.exports = {
  generateJwtToken,
  authenticateJwtToken,
};
