/**
 * Project model
 */

const Sequelize = require('sequelize');

module.exports = (function(sequelize) {
  let Project = sequelize.define('project', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    organizationId: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    stack: {
      type: Sequelize.ENUM,
      values: ['node', 'meanstack', 'flask', 'other'],
      defaultValue: 'node'
    },
    environment: {
      type: Sequelize.STRING
    },
    dbStack: {
     type: Sequelize.STRING
    },
    createdBy: {
      type: Sequelize.STRING(32)
    },
    updatedBy: {
      type: Sequelize.STRING(32)
    }
  }, {
    classMethods: {
      associate: function() {
        User.hasMany(Credential, {onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true});
      }
    }
  });

  return Project;
})(server.config.sequelize);
