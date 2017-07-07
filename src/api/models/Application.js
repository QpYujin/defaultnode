/**
 * Application model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let Application = sequelize.define('application', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    organizationId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    projectId: {
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
    versionId: {
      type: Sequelize.STRING(128)
    },
    releaseId: {
      type: Sequelize.STRING(128)
    },
    dbStackId: {
      type: Sequelize.STRING(128)
    },
    sourceManagementId: {
      type: Sequelize.STRING(128)
    },
    imageRepositoryId: {
      type: Sequelize.STRING(128)
    },
    cloudProviderId: {
      type: Sequelize.STRING(128)
    }
    // ami: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // sshUser: {
    //   type: Sequelize.STRING,
    //   // allowNull: false,
    // },
    // accessKey: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // accessSecretKey: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // instanceType: {
    //   type: Sequelize.STRING,
    //   // allowNull: false,
    // },
    // region: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // securityGroup: {
    //   type: Sequelize.STRING,
    //   // allowNull: false,
    // },
    // subnet: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // vpc: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // zone: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // tags: {
    //   type: Sequelize.STRING,
    //   // allowNull: false,
    // },
    // profile: {
    //   type: Sequelize.STRING,
    //   // allowNull: false,
    // },
    // github.js: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // instanceName: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // configFile: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // configFilePath: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
  }, {
    classMethods: {
      associate: function() {
        User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
      }
    }
  });

  return Application;
})(server.config.sequelize);
