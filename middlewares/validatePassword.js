const joi = require('joi');

const HTTP_NOT_FOUND_STATUS = 400;

const joiPassword = joi.object({
  password: joi.string().min(6).required().messages({
    'string.min': 'O "password" deve ter pelo menos 6 caracteres',
    'any.required': 'O campo "password" é obrigatório',
  }),
});

const validatePassword = (request, response, next) => {
  const { password } = request.body;
  const { error } = joiPassword.validate({ password });
  if (error) return response.status(HTTP_NOT_FOUND_STATUS).json({ message: error.message });
  next();
};

module.exports = validatePassword;