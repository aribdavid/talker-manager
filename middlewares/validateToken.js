const validateToken = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    const message = response.status(401).json({ message: 'Token não encontrado' });
    return next(message);
  }

  if (authorization.length !== 16) {
    const message = response.status(401).json({ message: 'Token inválido' });
    return next(message);
  }

  next();
};

module.exports = validateToken;