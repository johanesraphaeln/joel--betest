const Joi = require('joi');

const createUserSchema = Joi.object({
  userName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  identityNumber: Joi.string().required(),
});

module.exports = createUserSchema;
