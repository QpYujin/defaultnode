/**
 * SourceManagement model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let SourceManagement = sequelize.define('sourcemanagement', {
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
      type: Sequelize.STRING,
      allowNull: false,
    },
    provider: {
      type: Sequelize.ENUM,
      values: ['github', 'bitbucket', 'codecommit', 's3'],
      defaultValue: 'github'
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM,
      values: ['private', 'public'],
      defaultValue: 'public'
    },
    sshKey: {
      type: Sequelize.STRING,
    },
  }, {
    classMethods: {
      associate: function() {
        User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
      }
    }
  });

  return SourceManagement;
})(server.config.sequelize);
