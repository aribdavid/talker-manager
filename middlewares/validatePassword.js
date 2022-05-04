const joi = require('joi');

const JoiPassword = joi.object({
  password: joi.string().min(6).required().messages({
    'string.min': 'O "password" deve ter pelo menos 6 caracteres',
    'any.required': 'O campo "password" é obrigatório',
  }),
});

const validatePassword = (request, response, next) => {
  const { password } = request.body;
  const { error } = JoiPassword.validate({ password });
  if (error) return response.status(400).json({ message: error.message });
  next();
};

module.exports = validatePassword; 