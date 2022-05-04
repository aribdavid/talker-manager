const joi = require('joi');

const HTTP_NOT_FOUND_STATUS = 400;

const JoiEmail = joi.object({
  email: joi.string().email().required().messages({
    'string.email': 'O "email" deve ter o formato "email@email.com"',
    'any.required': 'O campo "email" é obrigatório',
  }),
});

const validateEmail = (request, response, next) => {
  const { email } = request.body;
  const { error } = JoiEmail.validate({ email });
  if (error) return response.status(HTTP_NOT_FOUND_STATUS).json({ message: error.message });
  return next();
};

module.exports = validateEmail;