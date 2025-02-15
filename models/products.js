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

const findUserById = async (userId) => {
  const query = 'SELECT * FROM users WHERE id = ?;';

  const [user] = await connection.execute(query, [userId]);

  return user[0];
};

const findCompanyById = async (companyId, userId) => {
  const query = 'SELECT * FROM companies WHERE id = ? AND userId = ?;';

  const [company] = await connection.execute(query, [companyId, userId]);

  return company[0];
};

const findByProductName = async (userId, companyId, name) => {
  const query =
    'SELECT * FROM products WHERE name = ? AND userId = ? AND companyId = ?;';

  const [product] = await connection.execute(query, [name, userId, companyId]);

  return product[0];
};

const findByProductId = async (userId, companyId, insertId) => {
  const query =
    'SELECT * FROM products WHERE id = ? AND userId = ? AND companyId = ?;';

  const [product] = await connection.execute(query, [
    insertId,
    userId,
    companyId,
  ]);

  return product[0];
};

const register = async (parameters) => {
  const { userId, companyId, name, price, barcode } = parameters;
  const query =
    'INSERT INTO products(userId, companyId, name, price, barcode) VALUES (?, ?, ?, ?, ?);';

  const [product] = await connection.execute(query, [
    userId,
    companyId,
    name,
    price,
    barcode,
  ]);

  return { insertId: product.insertId };
};

const update = async (productId, companyId, userId, parameters) => {
  const { name, price, barcode } = parameters;
  const query =
    'UPDATE products SET name = ?, price = ?, barcode = ? WHERE id = ? AND companyId = ? AND userId = ?;';

  const [updatedUser] = await connection.execute(query, [
    name,
    price,
    barcode,
    productId,
    companyId,
    userId,
  ]);
  return updatedUser;
};

const deleteCompany = async (userId, productId, companyId) => {
  const query =
    'DELETE FROM products WHERE id = ? AND userId = ? AND companyId = ?;';

  const [deletedUser] = await connection.execute(query, [
    productId,
    userId,
    companyId,
  ]);

  return deletedUser;
};

module.exports = {
  findAll,
  findById,
  findUserById,
  findCompanyById,
  findByProductName,
  findByProductId,
  register,
  update,
  delete: deleteCompany,
};
