const jwt = require('jsonwebtoken');

const { getToken } = require('../helpers/authService');

const { SECRET_JWT } = process.env;

const verifyToken = (request, response, next) => {
  const { authorization } = request.headers;

  if (authorization) {
    try {
      const token = getToken(request);
      jwt.verify(token, SECRET_JWT);
    } catch (error) {
      console.error(error);

      if (error.message === 'jwt expired')
        return response.status(401).json({
          message: 'Esse token foi expirado.',
        });

      return response.status(401).json({
        message: 'Token inválido ao decodifica-lo.',
      });
    }
  } else {
    return response.status(401).json({
      message: 'Por favor insira o token no cabeçalho da requisição.',
    });
  }

  next();
};

module.exports = verifyToken;
