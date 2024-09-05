const { verifyToken } = require("../helpers/jwt");
const {User} = require('../models')



async function authentication (req, res, next){

    try {
      const { authorization } = req.headers;
        if (!authorization) {
            throw new Error("UNAUTHENTICATED")
        }

      const token = authorization.split(" ")[1];
     
      if (!token) {
        throw new Error ("UNAUTHENTICATED")
      }

      const payload = verifyToken(token);
      const cekUser = await User.findByPk(payload.id);

      if (!cekUser) {
        throw new Error ("UNAUTHENTICATED")
      }

      req.loginInfo = {
        id: cekUser.id,
        email: cekUser.email,
        role: cekUser.role,
      };

      
      next();
    } catch (error) {
      
      next(error);
    }
}

module.exports = authentication