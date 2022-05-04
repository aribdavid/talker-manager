const express = require('express');
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const router = express.Router();

const getData = async (request, _response, next) => {
  try {
    const data = await fs.readFile('./talker.json');
    request.data = JSON.parse(data);
    next();
  } catch (error) {
    next(error);
  }
};

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
module.exports = router; 