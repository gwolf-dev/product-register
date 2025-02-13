const connection = require('./config/connection');

const findAll = async (userId, companyId) => {
  const query = 'SELECT * FROM products WHERE userId = ? AND companyId = ?;';

  const [products] = await connection.execute(query, [userId, companyId]);

  return products;
};

const findById = async (userId, productId, companyId) => {
  const query =
    'SELECT * FROM products WHERE userId = ? AND id = ? AND companyId = ?;';

  const [product] = await connection.execute(query, [
    userId,
    productId,
    companyId,
  ]);

  return product[0];
};

module.exports = { findAll, findById };
