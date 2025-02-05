const jwt = require('jsonwebtoken');

const translationFile = require('./translation');
const { getToken } = require('../../helpers/authService');

const { SECRET_JWT_TOKEN } = process.env;

module.exports = (request, response, next) => {
  const { authorization } = request.headers;
  const { language } = request.body;
  const translation = translationFile[language || 'pt-BR'];

  if (authorization) {
    try {
      const token = getToken(request);
      jwt.verify(token, SECRET_JWT_TOKEN);
    } catch (error) {
      console.error(error);

      if (error.message === 'jwt expired')
        return response.status(401).json({
          message: translation.expiredToken,
        });

      return response.status(401).json({
        message: translation.invalidDecodedToken,
      });
    }
  } else {
    return response.status(401).json({
      message: translation.invalidHeaderToken,
    });
  }

  next();
};
