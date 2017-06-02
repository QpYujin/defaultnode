/**
 * CloudProvider model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let CloudProvider = sequelize.define('cloudprovider', {
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
      values: ['aws', 'azure', 'gcp'],
      defaultValue: 'aws'
    },
    publicKey: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    privateKey: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: function() {
        User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
      }
    }
  });

  return CloudProvider;
})(server.config.sequelize);
