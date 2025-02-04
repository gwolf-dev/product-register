const jwt = require('jsonwebtoken');

const { SECRET_JWT } = process.env;

const generateToken = (data) => jwt.sign(data, SECRET_JWT, { expiresIn: '1d' });

const getToken = (request) => {
  const { authorization } = request.headers;
  if (!authorization) return null;

  const token = authorization.split(' ')[1];

  return token;
};

module.exports = { generateToken, getToken };
