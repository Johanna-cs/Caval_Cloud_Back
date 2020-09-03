'use strict';

module.exports = (sequelize, DataTypes) => {
  const FavoriteHorses = sequelize.define('FavoriteHorses', {
        user_ID: DataTypes.INTEGER,
        horse_ID: DataTypes.INTEGER,
        horse_name : DataTypes.STRING,
        horse_photo1 : DataTypes.STRING
  }, {});
    
// FavoriteHorses.associate = models => {
//         FavoriteHorses.hasOne(models.Horse, {through : 'id'});
//     }

    
    return FavoriteHorses;
}