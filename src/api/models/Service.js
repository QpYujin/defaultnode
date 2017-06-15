const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let Service = sequelize.define('service', {
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
    
    applicationId: {
      type: Sequelize.STRING,
      allowNull: false,
    },

      appname: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      namespace: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      domain: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      port: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
  
      dockerimage: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
    {
      classMethods: {
        associate: function() {
          User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
        }
      }
    });
  return Service;
})(server.config.sequelize);

