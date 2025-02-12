const connection = require('./config/connection');

const findAll = async (userId, companyId) => {
  const query = 'SELECT * FROM products WHERE userId = ? AND companyId = ?;';

  const [products] = await connection.execute(query, [userId, companyId]);

  return products;
};

module.exports = { findAll };
