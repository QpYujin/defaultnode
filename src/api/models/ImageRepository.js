/**
 * ImageRepository model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let ImageRepository = sequelize.define('imagerepository', {
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
      values: ['dockerhub', 's3', 'ecr'],
      defaultValue: 'dockerhub'
    },
    type: {
      type: Sequelize.ENUM,
      values: ['private', 'public'],
      defaultValue: 'public'
    },
    url: {
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

  return ImageRepository;
})(server.config.sequelize);
