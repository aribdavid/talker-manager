const joi = require('joi');

const joiAge = joi.object({
  age: joi.number().min(18).required().messages({
    'number.min': 'A pessoa palestrante deve ser maior de idade',
    'any.required': 'O campo "age" é obrigatório',
  }),
});

module.exports = joiAge;