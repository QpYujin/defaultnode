const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let Instance = sequelize.define('instance', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      noofinstances: {
        type: Sequelize.INTEGER,
        allowNull: true,
       }
      },
      {
      classMethods: {
        associate: function() {
          User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
        }
      }
    });
  return Instance;
})(server.config.sequelize);
