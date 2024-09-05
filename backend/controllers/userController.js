const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { makeToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { Hooks } = require("sequelize/lib/hooks");

class UserController {
  static async Register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = await User.create({ username, email, password });

      const users = await User.findOne({
        where: {
          email,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(201).json(users); 
    } catch (error) {
  
      next(error);
    }
  }

  static async login(req, res, next) { 
    try {
      const { email, password } = req.body;

      if (!email || !password) throw new Error("InvalidLogin");

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) throw new Error("LoginError");

      if (!compare(password, user.password)) throw new Error("LoginError");

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const access_token = makeToken(payload);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async LoginWithGoogel(req,res, next){
    try {
      const {token} = req.headers
      const client = new OAuth2Client()

      const tiket = await client.verifyIdToken({
        idToken : token,
        audience : process.env.GOOGLE_APPLICATION_CREDENTIALS
      })
      const payload = tiket.getPayload()
     

      const [user, create] = await User.findOrCreate({
        where : {
          email : payload.email
        },
        default : {
          email : payload.email,
          password : "password_google"
        },
        hooks: false
      })

      const access_token = singToken({
        id : user.id,
        email : user.email
      })

      res.status(200).json({ access_token})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;
