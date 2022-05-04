const joiAge = require('../helpers/joi/joiAge');

const validateAge = (request, response, next) => {
  const { age } = request.body;
  const { error } = joiAge.validate({ age });

  if (error) {
    const message = response.status(400).json({ message: error.message });
    return next(message);
  }

  next();
};

module.exports = validateAge;