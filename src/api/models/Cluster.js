const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let Cluster = sequelize.define('cluster', {
      namespace: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      servicename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deploymentyaml:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      serviceyaml:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      dockerimage:{
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
  return Cluster;
})(server.config.sequelize);
