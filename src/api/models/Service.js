const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let Service = sequelize.define('service', {
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

