'use strict';

module.exports = (sequelize, DataTypes) => {
  const FavoriteHorses = sequelize.define('FavoriteHorses', {
        userid: DataTypes.INTEGER,
        horseid: DataTypes.INTEGER
  }, {});
    
// FavoriteHorses.associate = models => {
//         Owner_presentation.hasMany(models.Horse);
//     }

    
    return FavoriteHorses;
}