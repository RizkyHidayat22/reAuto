const { User, Product } = require('../models');

module.exports = {
    
    authorizationAsAdmin : async(req,res,next) => {
       try {
        const { role } = req.loginInfo;
        if (role !== 'Admin'){
            throw new Error ('FORBIDDEN')
        }
        next()
       } catch (error) {
        next(error)
       }

    }
};
