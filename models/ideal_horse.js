'use strict';

module.exports = (sequelize, DataTypes) => {

    const Ideal_horse = sequelize.define('Ideal_horse', {

        ideal_horse_ID : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,  
        },

        ideal_horse_size: {
            type : DataTypes.INTEGER,
        },

        ideal_horse_age: {
            type : DataTypes.INTEGER,
        },

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
            }
        },
    }, {});

    Ideal_horse.associate= models =>{
        Ideal_horse.hasMany(models.Rider)
    }
    
    return Ideal_horse;
}