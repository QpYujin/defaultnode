/**
 * Credential model
 */


const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (function(sequelize) {

  let Credential = sequelize.define('credential', {
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING
    },
    provider: {
      type: Sequelize.STRING
    },
    identifier: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.STRING
    },
    json: {
      type: Sequelize.JSON
    }
  }, {
    instanceMethods: {
      validatePassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    classMethods: {
      associate: function() {
        Credential.belongsTo(User, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
      }
    }
  });

  Credential.beforeCreate((cred) => {
    if (cred.password) {
      cred.password = bcrypt.hashSync(cred.password, 10);
    }
  });

  Credential.beforeUpdate((cred) => {
    if (cred.password) {
      cred.password = bcrypt.hashSync(cred.password, 10);
    }
  });

  return Credential;
})(server.config.sequelize);
