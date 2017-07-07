/**
 * BuildImage model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let BuildImage = sequelize.define('buildimage', {
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
    version: {
      type: Sequelize.STRING(64),
      allowNull: true,
      unique: true
    },
    applicationId: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    status: {
      type: Sequelize.STRING(32)
    },
    stage: {
      type: Sequelize.STRING(64)
    },
    tag: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    releaseId: {
      type: Sequelize.STRING(64),
      allowNull: true
    },
    sourceControlId: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    repoName: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    branchName: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    imageRepoId:{
      type: Sequelize.STRING(64)
    },
    logs: {
      type: Sequelize.TEXT
    }
  }, {
    classMethods: {
      associate: function() {
        User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
      }
    }
  });

  return BuildImage;
})(server.config.sequelize);
