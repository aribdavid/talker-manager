const express = require('express');
const crypto = require('crypto');
const fs = require('fs').promises;
const getData = require('./middlewares/getData');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validateAge = require('./middlewares/validateAge');
const validateToken = require('./middlewares/validateToken');
const validateTalker = require('./middlewares/validateTalker');
const validateName = require('./middlewares/validateName');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const router = express.Router();

router.get('/talker', getData, (request, response) => {
  const { data } = request;
   response.status(HTTP_OK_STATUS).json(data);
});

router.get('/talker/:id', getData, (request, response) => {
  const { id } = request.params;
  const { data } = request;

  const talkerId = data.find((elem) => elem.id === parseInt(id, 10));
  if (!talkerId) {
 return response.status(HTTP_NOT_FOUND_STATUS)
  .json({ message: 'Pessoa palestrante não encontrada' }); 
}
return response.status(HTTP_OK_STATUS).json(talkerId);
});

router.post('/login', validateEmail, validatePassword, (_request, response) => {
  // const { email, password } = request.body;
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(HTTP_OK_STATUS).json({ token });
});

router.post('/talker', validateToken, validateName, validateAge, 
validateTalker, getData,
 async (request, response) => {
  const { data } = request;
  const talker = { id: data.length + 1, ...request.body };
  fs.writeFile('./talker.json', JSON.stringify([...data, talker], null, 2))
  .then((_res) => response.status(201).json(talker));
});

router.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalker,
  getData,
  async (request, response) => {
    const { data } = request;
    const { id } = request.params;
    const indexTalker = data.findIndex((talker) => talker.id === Number(id));
    data[indexTalker] = {
      ...data[indexTalker],
      ...request.body,
    };
    fs.writeFile('./talker.json', JSON.stringify([...data], null, 2))
    .then((_res) => response.status(200).json(data[indexTalker]));
});

module.exports = router; 