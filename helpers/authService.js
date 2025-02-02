const jwt = require('jsonwebtoken');

const { SECRET_JWT } = process.env;

const decodeToken = async (token) => {
  try {
    const data = await jwt.verify(token, SECRET_JWT);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const generateToken = (data) => jwt.sign(data, SECRET_JWT, { expiresIn: '1d' });

const getToken = (request) => {
  const { authorization } = request.headers;
  const token = authorization.split(' ')[1];

  return token;
};

module.exports = { decodeToken, generateToken, getToken };
