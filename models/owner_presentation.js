'use strict';


module.exports = (sequelize, DataTypes) => {

    const Owner_presentation = sequelize.define('Owner_presentation', {

        owner_ID : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,  
            },

        owner_age : {
            type: DataTypes.INTEGER,   
        },

        owner_character : {
            type : DataTypes.STRING,
            validate : {
                max : 80,
            }
        },

        owner_horse_work : {
            type : DataTypes.STRING,
            validate : {
                max : 80,
            }
        },

        owner_horse_name : {
            type : DataTypes.STRING,
            validate : {
                max : 80,
            }
        },

        owner_biography : {
            type : DataTypes.STRING,
            validate : {
                max : 255,
            }
        },

        owner_communication_frequences : {
            type : DataTypes.STRING,
            validate : {
                max : 80,
            }
        }
    }, {});
    
    
    Owner_presentation.associate = models => {
        Owner_presentation.hasMany(models.Horse, {foreignKey: 'horse_ID'});
    }

    
    return Owner_presentation;
}