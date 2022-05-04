const express = require('express');
const data = require('./data');

const HTTP_OK_STATUS = 200;

const router = express.Router();

router.get('/talker', (request, response) => {
  if (data.length !== 0) return response.status(HTTP_OK_STATUS).json(data);
  response.status(HTTP_OK_STATUS).json([]);
});

module.exports = router; 