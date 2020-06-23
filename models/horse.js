  {

    const Horse = sequelize.define('Horse', { 
        
        horse_ID : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,  
        },

        horse_biography: {
            type: DataTypes.STRING,
            validate : {
                max : 255
            }
        },

        horse_name: {
            type: DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        horse_age: {
            type: DataTypes.INTEGER,
        },

        horse_height: {
            type: DataTypes.INTEGER,
        },

        horse_temper: {
            type: DataTypes.STRING,
            validate : {
                max : 80
            }        },

        horse_character: {
            type: DataTypes.STRING,
            validate : {
                max : 80
            }        },

        horse_body_type: {
            type: DataTypes.STRING,
            validate : {
                max : 80
            }        },

        horse_localisation:{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }        },

        horse_get_lesson:{
            type: DataTypes.BOOLEAN,
        },

        horse_get_coach:{
            type: DataTypes.BOOLEAN,
        },

        horse_other_discipline:{
            type: DataTypes.BOOLEAN,
        },

        horse_mensuel_price:{
            type: DataTypes.INTEGER,
        },

        horse_other_fees:{
            type: DataTypes.INTEGER,
        },

        horse_stroll_along:{
            type: DataTypes.BOOLEAN,
        },

        horse_photos: {
            type: DataTypes.BLOB,
        },

        horse_location_type:{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        horse_competition_preferences:{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }
        },

        horse_riding_frequency:{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }

        },

        horse_accomodation_horse:{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }

        },

        horse_practice_structure:{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }

        },

        horse_disciplines:{
            type: DataTypes.STRING,
            validate : {
                max : 80
            }

        },

        
    }, 
    {});

    Horse.associate = models => {
        Horse.belongsTo(models.Ideal_rider, {foreignKey: 'horse_ID'})
        Horse.belongsTo(models.Owner_presentation, {foreignKey: 'horse_ID'})
        Horse.belongsTo(models.User, {foreignKey: 'horse_ID'})



    }

    return Horse;
}