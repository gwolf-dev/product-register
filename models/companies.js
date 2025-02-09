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

module.exports = {
  findAll,
  findByCompanyId,
};
