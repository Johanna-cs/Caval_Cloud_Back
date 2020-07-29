'use strict';

module.exports = (sequelize, DataTypes) => {
  const FavoriteHorses = sequelize.define('FavoriteHorses', {
        userid: DataTypes.INTEGER,
        horseid: DataTypes.INTEGER,
        horsename : DataTypes.STRING,
        urlphoto : DataTypes.STRING
  }, {});
    
// FavoriteHorses.associate = models => {
//         FavoriteHorses.hasOne(models.Horse, {through : 'id'});
//     }

    
    return FavoriteHorses;
}