'use strict';


module.exports = (sequelize, DataTypes) => {

    const Owner_presentation = sequelize.define('Owner_presentation', {

        owner_ID : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,  
            },

        owner_firstname : {
            type : DataTypes.STRING,
            validate : {
                max : 150,
            }
        },

        owner_age : {
            type: DataTypes.INTEGER,   
        },

        owner_caracter : {
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

        owner_message : {
            type : DataTypes.STRING,
            validate : {
                max : 255,
            }
        },

        owner_communication_frequency : {
            type : DataTypes.STRING,
            validate : {
                max : 80,
            }
        }
    }, {});
    
    
    // Owner_presentation.associate = models => {
    //     Owner_presentation.hasMany(models.Horse, {foreignKey:'ownerPres_ID'});
    // }

    
    return Owner_presentation;
}