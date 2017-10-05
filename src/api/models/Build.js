/**
 * Build model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let Build = sequelize.define('build', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    organizationId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    ami: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sshUser: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    accessKey: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    accessSecretKey: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    instanceType: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    region: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    securityGroup: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    subnet: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    vpc: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    zone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tags: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    profile: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    github: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    instanceName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    configFile: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    configFilePath: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    applicationId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'deploying', 'finished', 'failed'],
      defaultValue: 'pending'
    },
    domain: {
      type: Sequelize.STRING
    },
    log: {
      type: Sequelize.TEXT
    },
    machineName: {
      type: Sequelize.STRING
    },
    machineIP: {
      type: Sequelize.STRING(128)
    }
  }, {
    classMethods: {
      associate: function() {
        User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
      }
    }
  });

  return Build;
})(server.config.sequelize);
