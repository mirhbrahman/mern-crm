const Joi = require("joi");

module.exports = data => {
  let errors = {};
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .required()
      .min(5)
      .max(255)
      .email(),
    phone: Joi.string()
      .required()
      .min(5)
      .max(50),
    website: Joi.string(),
    primaryAddress: Joi.string()
      .required()
      .min(2),
    secondaryAddress: Joi.string()
  };

  const { error } = Joi.validate(data, schema, { abortEarly: false });
  if (error) {
    // Set all errors
    error.details.map(err => {
      errors[err.path] = err.message;
    });
  } else {
    errors = false;
  }

  return { errors };
};
