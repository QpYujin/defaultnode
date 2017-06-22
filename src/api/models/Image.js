/**
 * Image model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let Image = sequelize.define('image', {
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
    /*version: {
      type: Sequelize.STRING(64),
      allowNull: true,
    },*/

    applicationId: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    buildImageId: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    status: {
      type: Sequelize.STRING(128),
      allowNull: false
    },

    /*stage: {
      type: Sequelize.STRING(128),
      allowNull: true
    },*/
  
  }, {
    classMethods: {
      associate: function() {
        User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
      }
    }
  });

  return Image;
})(server.config.sequelize);
