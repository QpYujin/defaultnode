const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let Service = sequelize.define('service', {
      appname: {
        type: Sequelize.STRING,//application name
        allowNull: false,
      },

      namespace: {
        type: Sequelize.STRING,//same as application
        allowNull: false,
      },

      domain: {
        type: Sequelize.STRING,//same as appname
        allowNull: false,
      },

      port: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      servicename: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      serviceyaml:{
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
