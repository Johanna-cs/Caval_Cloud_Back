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
//            allowNull: false,
            validate : {

                max: 80,
            }    
        },

        user_lastname : {
            type : DataTypes.STRING,
            validate : {
  //              allowNull: false,
                max : 80,
            }
        },

        user_email : {
            type : DataTypes.STRING,
            unique: true,
            validate : {
                isEmail: true,
 //               allowNull: false,
                max: 80,
            }
        },

        user_password : {
            type : DataTypes.STRING,
            validate : {
 //               allowNull : false,
                min : 5,
            }
            
        },

        user_accept_CGV : {
            type : DataTypes.BOOLEAN,
            validate : {
     //           allowNull : false,
//                defaultValue : 0,
            }
        },

        user_avatar : {
            type : DataTypes.BLOB,
        }

        
    }, {});
    
    return User;
}
