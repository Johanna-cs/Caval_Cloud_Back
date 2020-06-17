'use strict';

module.exports = (sequelize, DataTypes) => {

    const Ideal_horse = sequelize.define('Ideal_horse', {

        ideal_horse_ID : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,  
        },

        ideal_horse_heigth_min: {
            type : DataTypes.INTEGER,
            validate : {
                max : 3
            }
        },

        ideal_horse_heigth_max: {
            type : DataTypes.INTEGER,
            validate : {
                max : 3
            }
        },

        ideal_horse_min_age: {
            type : DataTypes.INTEGER,
            validate : {
                max : 2
            }
        },

        ideal_horse_max_age: {
            type : DataTypes.INTEGER,
            validate : {
                max : 2
            }
        },

        ideal_horse_temper: {
            type : DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        ideal_horse_character: {
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
    
    return Ideal_horse;
}