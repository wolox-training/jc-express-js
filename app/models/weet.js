const { extractField } = require('../serializers');

module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    { underscored: true }
  );

  Weet.associate = models => Weet.belongsTo(models.User, { foreigKey: 'user_id', as: 'user' });

  Weet.getAll = ({ offset, limit }) =>
    Weet.findAndCountAll({
      offset,
      limit
    }).then(result => ({
      count: result.count,
      rows: extractField('dataValues')(result.rows)
    }));

  return Weet;
};
