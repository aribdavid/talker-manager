const joi = require('joi');

const joiName = joi.object({
  name: joi.string().min(3).required().messages({
    'string.min': 'O "name" deve ter pelo menos 3 caracteres',
    'any.required': 'O campo "name" é obrigatório',
  }),
});
module.exports = joiName;