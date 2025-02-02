const { getToken, decodeToken } = require('../helpers/authService');

const verifyToken = async (request, response, next) => {
  const { authorization } = request.headers;

  if (authorization) {
    const token = getToken(request);

    if (!token)
      return response.status(403).json({
        message: 'Acesso negado! Realize a autenticação de maneira correta.',
      });

    const tokenDecoded = await decodeToken(token);
    if (!tokenDecoded)
      response.status(401).json({
        message: 'Token inválido ao decodifica-lo.',
      });

    next();
  } else {
    response.status(403).json({
      message: 'Por favor insira o token no cabeçalho da requisição.',
    });
  }
};

module.exports = verifyToken;
