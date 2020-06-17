module.exports = (sequelize, DataTypes) => {

    const Ideal_rider = sequelize.define('Ideal_rider', {

        ideal_rider_ID : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,  
        },

        ideal_rider_years_of_practice: {
            type : DataTypes.INTEGER,
            validate : {
                max : 2
            }
        },

        ideal_rider_gallop_level: {
            type : DataTypes.INTEGER,
            validate : {
                max : 2
            }
        },

        ideal_rider_age: {
            type : DataTypes.INTEGER,
            validate : {
                max : 2
            }
        },

        ideal_rider_vehiculed: {
            type : DataTypes.BOOLEAN
        },

        ideal_rider_managed_horse: {
            type : DataTypes.BOOLEAN
        },

        ideal_rider_material: {
            type: DataTypes.STRING,
            max: 80
        },
    
    })
}