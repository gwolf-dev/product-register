const connection = require('./config/connection');

const findAll = async (userId) => {
  const query = 'SELECT * FROM companies WHERE userId = ?;';

  const [companies] = await connection.execute(query, [userId]);

  return companies;
};

module.exports = {
  findAll,
};
