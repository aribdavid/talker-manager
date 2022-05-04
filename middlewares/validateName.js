const joiName = require('../helpers/joi/joiName');

const validateName = (request, response, next) => {
  const { name } = request.body;
  const { error } = joiName.validate({ name });

  if (error) {
    const message = response.status(400).json({ message: error.message });
    return next(message);
  }

  next();
};

module.exports = validateName;
