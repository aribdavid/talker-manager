const express = require('express');
const data = require('./data');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const router = express.Router();

router.get('/talker', (request, response) => {
  if (data.length !== 0) return response.status(HTTP_OK_STATUS).json(data);
  response.status(HTTP_OK_STATUS).json([]);
});

router.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const talkerId = data.find((elem) => elem.id === parseInt(id, 10));
  if (!talkerId) {
 return response.status(HTTP_NOT_FOUND_STATUS)
  .json({ message: 'Pessoa palestrante não encontrada' }); 
}
return response.status(HTTP_OK_STATUS).json(talkerId);
});

module.exports = router; 