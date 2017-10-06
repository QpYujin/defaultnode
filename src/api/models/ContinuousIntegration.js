/**
 * continuous integration model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let ContinuousIntegration = sequelize.define('continuousintegration', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    organizationId: {
      type: Sequelize.STRING
    },
    projectId: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    ci:
      {
        type: Sequelize.ENUM,
        values: ['Jenkins'],
        defaultValue: 'Jenkins',
      },
    url:
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    apikeys:{
      type: Sequelize.STRING,
      allowNull: true,
  },

  }, {
    classMethods: {
      associate: function() {
        User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
      }
    }
  });

  return ContinuousIntegration;
})(server.config.sequelize);
