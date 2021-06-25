const Joi = require("joi");

const authSchema = Joi.object({
  name: Joi.string().trim().min(2),
  email: Joi.string().lowercase().email().required(),
  password: Joi.string().min(2).required(),
});

module.exports = { authSchema };
