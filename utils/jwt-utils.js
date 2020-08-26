const jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = 'dsS7d24s9s*!d33JsuYTsqq76s99s84mPOMYzrciN!!&356sspOP8Y/ndi7'

module.exports = {
    generateTokenForUser : function(userData) {
        return jwt.sign({
            user_ID : userData.user_ID,
            user_isAdmin : userData.user_isAdmin,

        }, 
        JWT_SIGN_SECRET,
        {
            expiresIn : '1n'
        })
    }
}