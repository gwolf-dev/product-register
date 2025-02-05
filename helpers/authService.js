const jwt = require('jsonwebtoken');

const { SECRET_JWT_TOKEN, SECRET_JWT_REFRESH_TOKEN } = process.env;

const generateToken = (data) =>
  jwt.sign(data, SECRET_JWT_TOKEN, { expiresIn: '1d' });

const generateRefreshToken = (data) =>
  jwt.sign(data, SECRET_JWT_REFRESH_TOKEN, { expiresIn: '7d' });

const getToken = (request) => {
  const { authorization } = request.headers;
  if (!authorization) return null;

  const token = authorization.split(' ')[1];

  return token;
};

module.exports = { generateToken, generateRefreshToken, getToken };
