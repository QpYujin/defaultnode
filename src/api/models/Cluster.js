const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let Cluster = sequelize.define('cluster', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      organizationId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      access: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      secret: {
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
