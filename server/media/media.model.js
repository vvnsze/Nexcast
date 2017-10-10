module.exports = function createMediaTable(sequelize, DataTypes) {
  const Media = sequelize.define('media', {
    type: {
      type: DataTypes.STRING(60),
    },
    link: {
      type: DataTypes.STRING(2083),
      notNull: true,
    },
    underscored: true,
  });
  return Media;
};
