/**
 * Sequelize
 */
const Sequelize = require('sequelize');
const nconf = require('nconf');

const dbConfig = nconf.get('mysql');

let opts = {
  host: dbConfig.host || 'localhost',
  port: dbConfig.port || 3306,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 100
  },

  logging: false
  // logging: server.log.debug
};

let dbName = dbConfig.database || 'tarabalam';
let dbUserName = dbConfig.username || 'tarabalam';
let dbPassword = dbConfig.password;

module.exports = new Sequelize(dbName, dbUserName, dbPassword, opts);
