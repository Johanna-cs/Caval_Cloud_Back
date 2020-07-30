'use strict';


module.exports = (sequelize, DataTypes) => {

    const Rider = sequelize.define('Rider', {

        rider_ID : {
            type: DataTypes.INTEGER,
           autoIncrement: true,
            primaryKey: true,  
        },

        rider_firstname : {
            type: DataTypes.STRING,
            defaultValue: '',
            // allowNull: false,

            validate : {
                max: 80
            }    
        },

        rider_lastname : {
            type : DataTypes.STRING,
            defaultValue: '',
            // allowNull: false,
            validate : {
                max : 80
            }
        },

        rider_avatar : {
            type : DataTypes.STRING,
        },

        rider_photo1 : {
            type : DataTypes.STRING,
        },
        rider_photo2 : {
            type : DataTypes.STRING,
        },
        rider_photo3 : {
            type : DataTypes.STRING,
        },

        rider_age : {
            type : DataTypes.INTEGER,
            defaultValue: 0,            

        },

        rider_postal_code : {
            type : DataTypes.INTEGER,
            defaultValue: 0,
            validate : {
                max : 99999
            }
        },

        rider_biography : {
            type : DataTypes.STRING,
            validate : {
                max : 255
            }

        },

        rider_selfWord1 : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        rider_selfWord2 : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        rider_selfWord3 : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        rider_ridingWord1 : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        rider_ridingWord2 : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },
        rider_ridingWord3 : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        rider_budget : {
            type : DataTypes.INTEGER,
            defaultValue: 0

        },

        rider_currency_budget : {
            type : DataTypes.STRING,
            defaultValue: '€',
        },

        rider_vehiculed : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0
        },

        rider_managed_horse : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0

        },

        rider_years_of_practice :{ 
            type : DataTypes.INTEGER,
            validate : {
                max : 99
            }
        },

        rider_gallop_level : {
            type : DataTypes.INTEGER,
            defaultValue: 0,
            validate : {
                max : 99
            }
        },


        rider_coaching_here : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0
        },

        rider_external_coach : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0
        },

        rider_competition : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            },
            defaultValue: ''
        },

        rider_riding_frequency :{
            type : DataTypes.STRING,
            defaultValue: '',
            validate : {
                max : 80
            }
        },
        
        rider_fixed_day : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0

        },

        rider_own_saddle : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0
        },

        rider_disciplines : {
            type : DataTypes.STRING,
            defaultValue: '',
            validate : {
                max : 80
            }
        },

        rider_agree_other_discipline : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0
        },


        ideal_horse_size: {
            type : DataTypes.INTEGER,
        },

        // ideal_horse_age: {
        //     type : DataTypes.INTEGER,
        // },

        ideal_horse_temper: {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        ideal_horse_caracter: {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        ideal_horse_body_type: {
            type : DataTypes.STRING,
            validate : {
                max : 80
            },
        }
    }, {});
    
    Rider.associate = models => {
        // Rider.belongsTo(models.Ideal_horse)
        Rider.belongsTo(models.User, {foreignKey:'user_ID'})
        Rider.hasMany(models.FavoriteRiders, {
            as : 'FavoriteRiders',
            foreignKey : 'rider_ID'
        })
    }
    
    return Rider;
    
}