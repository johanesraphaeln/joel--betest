const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const {
  getUserByAccountNumber,
  getUserByIdentityNumber,
  createUser,
  updateUser,
  removeUser,
} = require('./services/users-service');
const validate = require('./middlewares/validate-schema');
const createUserSchema = require('./validations/create-user');
const updateUserSchema = require('./validations/update-user');

router.post('/', validate(createUserSchema), async (req, res, next) => {
  try {
    const { userName, accountNumber, emailAddress, identityNumber } = req.body;
    const result = await createUser(
      userName,
      accountNumber,
      emailAddress,
      identityNumber
    );
    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      msg: 'CREATED',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/account/:accountNumber', async (req, res, next) => {
  try {
    const result = await getUserByAccountNumber(req.params.accountNumber);
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/identity/:identityNumber', async (req, res, next) => {
  try {
    const result = await getUserByIdentityNumber(req.params.identityNumber);
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', validate(updateUserSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      userName = null,
      accountNumber = null,
      emailAddress = null,
      identityNumber = null,
    } = req.body;

    const result = await updateUser(
      id,
      userName,
      accountNumber,
      emailAddress,
      identityNumber
    );

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeUser(id);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
