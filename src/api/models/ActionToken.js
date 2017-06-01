/**
 * ActionToken model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let ActionToken = sequelize.define('action_token', {
    token: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM,
      values: ['verify-email', 'forgot-password']
    },
    expiredOn: {
      type: Sequelize.DATE
    }
  }, {
    classMethods: {
      associate: function() {
        ActionToken.belongsTo(User);
      }
    }
  });

  return ActionToken;
})(server.config.sequelize);
