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
            expiresIn : '1h'
        })
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
      },
      getUserId: function(authorization) {
        let user_ID = -1;
        let token = module.exports.parseAuthorization(authorization);
        if(token != null) {
          try {
            let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if(jwtToken != null)
              user_ID = jwtToken.user_ID;
          } catch(err) { }
        }
        return user_ID;
      }
    }
