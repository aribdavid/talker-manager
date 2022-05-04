const joi = require('joi');
const joiDate = require('joi').extend(require('@joi/date'));

const joiTalker = joi.object({
  talk: joi.object({
    watchedAt: joiDate.date().format('DD/MM/YYYY').utc().required()
      .messages({
      'date.format': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      'any.required': 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }),
    rate: joi.number().integer().min(1).max(5)
      .required()
      .messages({
        'number.base': 'O campo deve ser um número',
        'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
        'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
        'any.required': 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      }),
  }).required()
    .messages({
      'any.required': 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }),
});

module.exports = joiTalker;