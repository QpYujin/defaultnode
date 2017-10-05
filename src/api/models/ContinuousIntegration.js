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
    ci:
      {
        type: Sequelize.ENUM,
        values: ['CICD'],
        defaultValue: 'CICD'
      },
    url:
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    Apikeys:{
      type: Sequelize.STRING,
      allowNull: false,
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
