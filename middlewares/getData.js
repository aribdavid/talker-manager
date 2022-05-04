const fs = require('fs').promises;

const getData = async (request, _response, next) => fs.readFile('./talker.json')
    .then((data) => { request.data = JSON.parse(data); })
    .then((_data) => next())
    .catch((err) => next(err));

module.exports = getData; 