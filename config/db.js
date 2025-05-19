const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
});

// Test connection
const testConnection = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');
    
    // Verify users table exists
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'users'"
	);
    
    if (tables.length === 0) {
      console.log('⚠️  Users table does not exist. Creating...');
      await connection.query(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ Users table created');
    }
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
};

testConnection();

module.exports = pool;