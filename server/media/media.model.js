module.exports = function createMediaTable(sequelize, DataTypes) {
  const Media = sequelize.define('media', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    type: {
      type: DataTypes.STRING(60),
    },
    link: {
      type: DataTypes.STRING(2083),
      notNull: true,
    },
  });
  return Media;
};
