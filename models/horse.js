'use strict';

module.exports = (sequelize, DataTypes) => {

    const Horse = sequelize.define('Horse', { 
        
        horse_ID : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,  
        },

        horse_biography : {
            type: DataTypes.STRING,
            validate : {
                max : 255
            }
        },

        horse_name : {
            type: DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        horse_age : {
            type: DataTypes.INTEGER,
        },

        horse_height : {
            type: DataTypes.INTEGER,
        },

        horse_temper : {
            type: DataTypes.STRING,
        },

        horse_character : {
            type: DataTypes.STRING,
            validate : {
                max : 80
            }        },

        horse_body_type : {
            type: DataTypes.STRING,
            },

        horse_localisation :{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }        },


        horse_coaching_here:{
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },

        horse_external_coach:{
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },

        horse_budget :{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

        horse_currency_budget : {
            type : DataTypes.STRING,
            defaultValue: '€',
            validate : {
                max : 5
            }
        },

        horse_rider_need_own_saddle : {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,

        },

        horse_currency_budget : {
            type : DataTypes.STRING,
            defaultValue: '€',
        },

        horse_other_fees :{
            type: DataTypes.INTEGER,
        },

        horse_stroll_along :{
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },

        horse_photos : {
            type: DataTypes.BLOB,
        },

        horse_location_type :{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        horse_competition_preferences :{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        horse_riding_frequency :{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }

        },
        
        horse_fixed_day : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0

        },

        horse_accomodation :{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }

        },

        horse_practice_structure :{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }

        },

        horse_disciplines :{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }

        },
        horse_own_saddle : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0
        },


        horse_material : {
            type: DataTypes.STRING,
            max: 80
        },

        
    }, 
    {});

    Horse.associate = models => {
        
        Horse.belongsTo(models.Ideal_rider, {foreignKey:'idealRider_ID'})
        Horse.belongsTo(models.Owner_presentation, {foreignKey:'ownerPres_ID'})
        Horse.belongsTo(models.User)
        Horse.belongsToMany(models.User, {through: 'favorites_horses'})
        Horse.hasMany(models.FavoriteHorses, {
            as : 'FavoriteHorses',
            foreignKey : 'horseid'
        })

    }

    return Horse;
}