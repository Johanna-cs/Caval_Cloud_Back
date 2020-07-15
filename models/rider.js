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
            allowNull: false,
            validate : {
                max: 80
            }    
        },

        rider_lastname : {
            type : DataTypes.STRING,
            allowNull: false,
            validate : {
                max : 80
            }
        },

        rider_avatar : {
            type : DataTypes.BLOB,
        },

        rider_photos : {
            type : DataTypes.BLOB,
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

        rider_caracteristic1 : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        rider_caracteristic2 : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        rider_caracteristic3 : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        rider_caracteristic_riding1 : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        rider_caracteristic_riding2 : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        rider_caracteristic_riding3: {
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

        rider_others_disciplines : {
            type : DataTypes.STRING,
            defaultValue : '',
            validate : {
                max : 80
            }
        },

        rider_get_lessons : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0
        },

        rider_get_coach : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0
        },

        rider_competition : {
            type : DataTypes.BOOLEAN,
            defaultValue: 0
        },

        rider_ridercommunication : {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
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

        rider_own_care_equipement : {
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

    }, {});
    
    Rider.associate = models => {
        Rider.belongsTo(models.Ideal_horse)
        Rider.belongsTo(models.User)
    }
    
    return Rider;
    
}