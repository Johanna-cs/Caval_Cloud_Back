'use strict';

module.exports = (sequelize, DataTypes) => {
  const FavoriteRiders = sequelize.define('FavoriteRiders', {
        user_ID: DataTypes.INTEGER,
        rider_ID: DataTypes.INTEGER,
        rider_firstname : DataTypes.STRING,
        rider_photo1 : DataTypes.STRING
  }, {});
    
// FavoriteHorses.associate = models => {
//         FavoriteHorses.hasOne(models.Horse, {through : 'id'});
//     }

    
    return FavoriteRiders;
}