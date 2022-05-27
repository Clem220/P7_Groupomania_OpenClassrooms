require('dotenv').config();
module.exports = {
    HOST: 'localhost',
    USER: process.env.SQL_USER,
    PASSWORD: process.env.SQL_PASSWORD,
    DB: process.env.SQL_DATABASE_NAME,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
