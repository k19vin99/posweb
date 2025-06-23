const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:Allcom.2025@localhost:5432/posweb_db"
});

module.exports = pool;
