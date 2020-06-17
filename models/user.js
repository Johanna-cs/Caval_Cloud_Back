'use strict';


module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        user_ID : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
            validate : {
                notNull: true,
            }},

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
        user_email: {
            type : DataTypes.STRING,
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
            }
            
        }

        
    }, )
}


db.define('Entries', {
    id: {
        type: Seq.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Seq.STRING,
        allowNull: false
    },
    entry: {
        type: Seq.TEXT,
        allowNull: false
    }
})
