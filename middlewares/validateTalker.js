const joiTalker = require('../helpers/joi/joiTalker');

const validateTalker = (request, response, next) => {
  const { talk } = request.body;
  const { error } = joiTalker.validate({ talk });

  if (error) {
    const message = response.status(400).json({ message: error.message });
    return next(message);
  }

  next();
};

module.exports = validateTalker;