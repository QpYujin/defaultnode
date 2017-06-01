/**
 * Created by tphuocthai on 3/13/17.
 */

const nconf = require('nconf');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

module.exports = session({
  secret: nconf.get('session_secret') || 'ye4_@kkq7yu!$0e-wb(*m)g*&648ch)!^$3m5d%0pz(f&(q-n9',
  resave: true,
  saveUninitialized: true,
  store: new RedisStore(_.defaults(nconf.get('redis'), {
    host: 'localhost',
    port: 6379,
    db: 0,
    prefix: 'sess:'
  }))
});
