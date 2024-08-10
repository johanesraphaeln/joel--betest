const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const {
  generateJwtToken,
  authenticateJwtToken,
} = require('./services/auth-service');
const validate = require('./middlewares/validate-schema');
const authenticateTokenSchema = require('./validations/authenticate-token');

router.get('/jwt/generate', (req, res, next) => {
  try {
    const result = generateJwtToken({
      payload: {
        userId: '1234567890',
        name: 'ms-joel-betest',
        admin: true,
      },
    });
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/jwt/authenticate',
  validate(authenticateTokenSchema),
  async (req, res, next) => {
    try {
      const { token } = req.body;
      const result = authenticateJwtToken(token);
      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        msg: 'OK',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
