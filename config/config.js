require('dotenv').config()

module.exports = 
{
  "development": {
    "username": "root",
    "password": "s8@%0oui23sLso",
    "database": "caval_cloud",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": "s8@%0oui23sLso",
    "database": "caval_cloud",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.USER,
    "password": process.env.PASS,
    "database": process.env.DB,
    "host": process.env.HOST,
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
