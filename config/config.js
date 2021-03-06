const fs = require('fs');
module.exports = {
  "development": {
    "username": "postgres",
    "password": "@#Geeeee",
    "database": "train_development",
    "port": 5432,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "Alhaq222",
    "database": "train_test",
    "port": 2500,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    "dialect": "postgres",
    "use_env_variable": "DATABASE_URL",
    "ssl": true,
    "protocol": "postgres",

    "logging": true,
    "dialectOptions":{
      "ssl":{
        "require": true,
      "rejectUnauthorized": false
      }
    }
  }
}
//heroku addons:create heroku-postgresql:hobby-dev
//heroku run bash
