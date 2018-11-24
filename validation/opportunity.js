const Joi = require("joi");

module.exports = data => {
  let errors = {};
  const schema = {
    contact: Joi.string().required(),
    title: Joi.string()
      .min(3)
      .max(100)
      .required(),
    amount: Joi.string().required(),

    startDate: Joi.date().required(),
    closeDate: Joi.date().allow(null, ""),
    probability: Joi.number()
      .required()
      .max(100),
    status: Joi.number().required(),
    stage: Joi.number().required(),
    description: Joi.string().allow(null, "")
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
