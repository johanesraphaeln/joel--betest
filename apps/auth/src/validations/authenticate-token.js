const Joi = require('joi');

const authenticateTokenSchema = Joi.object({
  token: Joi.string().required(),
});

module.exports = authenticateTokenSchema;
