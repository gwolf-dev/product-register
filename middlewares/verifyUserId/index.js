const jwt = require('jsonwebtoken');

const translationFile = require('./translation');
const { getToken } = require('../../helpers/authService');

const { SECRET_JWT_TOKEN, DEFAULT_LANGUAGE } = process.env;

module.exports = (request, response, next) => {
  const { authorization } = request.headers;
  const { userId, language } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  if (authorization) {
    try {
      const token = getToken(request);
      const { id } = jwt.verify(token, SECRET_JWT_TOKEN);
      const paramsNumberType = {
        id: Number(id),
        userId: Number(userId),
      };

      if (paramsNumberType.id !== paramsNumberType.userId)
        return response.status(400).json({
          message: translation.invalidUsers,
        });
    } catch (error) {
      console.error(error);

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
