/**
 * User model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    role: {
      type: Sequelize.ENUM,
      values: ['ADMIN', 'USER'],
      defaultValue: 'USER'
    },
    emailVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  enabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    classMethods: {
      associate: function() {
        User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
      }
    }
  });

  return User;
})(server.config.sequelize);
