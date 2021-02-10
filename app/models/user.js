const { extractField } = require('../serializers');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      sessionInvalidate: {
        type: DataTypes.DATE,
        field: 'session_invalidate',
        options: {
          timezone: '+00:00'
        }
      }
    },
    { underscored: true }
  );

  User.getAll = ({ offset, limit }) =>
    User.findAndCountAll({
      offset,
      limit
    }).then(result => ({
      count: result.count,
      rows: extractField('dataValues')(result.rows)
    }));

  User.invalidateSessions = userId => User.update({ sessionInvalid: new Date() }, { where: { id: userId } });

  return User;
};
