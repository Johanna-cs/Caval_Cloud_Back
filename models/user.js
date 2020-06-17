'use strict';


module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {

        user_ID : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,  
            },

        user_firstname : {
            type: DataTypes.STRING,
            validate : {
                notNull: true,
                max: 80,
            }    
        },

        user_lastname : {
            type : DataTypes.STRING,
            validate : {
                notNull: true,
                max : 80,
            }
        },
        user_email : {
            type : DataTypes.STRING,
            unique: true,
            validate : {
                isEmail: true,
                notNull: true,
                max: 80,
            }
        },

        user_password : {
            type : DataTypes.STRING,
            validate : {
                notNull : true,
                min : 5,
                max : 80,
            }
            
        },

        user_accept_CGV : {
            type : DataTypes.BOOLEAN,
            validate : {
                notNull : true,
                defaultValue : 0,
            }
        },

        user_avatar : {
            type : DataTypes.BLOB,
        }

        
    }, )
}