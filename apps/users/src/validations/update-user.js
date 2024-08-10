const Joi = require('joi');

const updateUserSchema = Joi.object({
  userName: Joi.string().optional(),
  accountNumber: Joi.string().optional(),
  emailAddress: Joi.string().email().optional(),
  identityNumber: Joi.string().optional(),
});

module.exports = updateUserSchema;
