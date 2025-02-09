const connection = require('./config/connection');

const findAll = async (userId) => {
  const query = 'SELECT * FROM companies WHERE userId = ?;';

  const [companies] = await connection.execute(query, [userId]);

  return companies;
};

const findByCompanyId = async (userId, companyId) => {
  const query = 'SELECT * FROM companies WHERE userId = ? AND id = ?;';

  const [company] = await connection.execute(query, [userId, companyId]);

  return company[0];
};

const findUserById = async (userId) => {
  const query = 'SELECT * FROM users WHERE id = ?;';

  const [user] = await connection.execute(query, [userId]);

  return user[0];
};

const findByCompanyName = async (userId, companyName) => {
  const query = 'SELECT * FROM companies WHERE userId = ? AND name = ?;';

  const [company] = await connection.execute(query, [userId, companyName]);

  return company[0];
};

const register = async (parameters) => {
  const { userId, name, address, phone, foundation, department } = parameters;
  const query =
    'INSERT INTO companies(userId, name, address, phone, foundation, department) VALUES (?, ?, ?, ?, ?, ?);';

  const [user] = await connection.execute(query, [
    userId,
    name,
    address,
    phone,
    foundation,
    department,
  ]);

  return { insertId: user.insertId };
};

module.exports = {
  findAll,
  findByCompanyId,
  findUserById,
  findByCompanyName,
  register,
};
