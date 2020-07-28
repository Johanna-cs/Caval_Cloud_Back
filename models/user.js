'use strict';

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {

        user_ID : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
            allowNull: false, 
            },

        user_firstname : {
            type: DataTypes.STRING,
            allowNull: false,   
        },

        user_lastname : {
            type : DataTypes.STRING,
            allowNull: false
        },

        user_email : {
            type : DataTypes.STRING,
            allowNull: false,
            // validate : {
            //     isEmail: true
            // }
        },

        user_password : {
            type : DataTypes.STRING,
            allowNull: false
        },

        user_accept_CGV : {
            type : DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue : 0,

        },

        user_avatar : {
            type : DataTypes.STRING,
        },

        user_isAdmin : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : 0
        },

        user_phone :{
            type : DataTypes.STRING
        },
        // user_createdAt:{
        //     type: Sequelize.DATE,
        //     defaultValue: Sequelize.NOW
        // }
        
    },
     {
        timestamps: false,
        underscored: true
     });
    
    User.associate = models => {
        User.hasOne(models.Rider, {foreignKey:'user_ID'})
        User.hasMany(models.Horse, {foreignKey:'user_ID'})
        User.belongsToMany(models.Horse, {through: 'favorites_horses'})
        User.hasMany(models.FavoriteHorses, {
            as : 'FavoriteHorses',
            foreignKey: 'user_ID'
        })
    }


    return User;
}
