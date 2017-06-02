/**
 * Release model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let Release = sequelize.define('release', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    organizationId: {
      type: Sequelize.STRING
    },
    applicationId: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    releaseDate: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function() {
        User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
      }
    }
  });

  return Release;
})(server.config.sequelize);
