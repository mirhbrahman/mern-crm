const Joi = require("joi");

module.exports = data => {
  let errors = {};
  const schema = {
    organization: Joi.string().allow(null, ""),
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
    title: Joi.string().allow(null, ""),
    department: Joi.string().allow(null, ""),
    website: Joi.string().allow(null, ""),
    primaryAddress: Joi.string()
      .required()
      .min(2),
    secondaryAddress: Joi.string().allow(null, ""),
    status: Joi.boolean().required(),
    role: Joi.boolean().required(),
    leadStatus: Joi.number().allow(null, "")
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
