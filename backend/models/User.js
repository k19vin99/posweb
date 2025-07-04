const pool = require('../config/db');

const createUser = async ({ email, password, role }) => {
  const result = await pool.query(
    'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
    [email, password, role]
  );
  return result.rows[0];
};

const findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = { createUser, findByEmail };
