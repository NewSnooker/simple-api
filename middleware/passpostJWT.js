const passport = require("passport");
const config = require("../config/index");
const User = require("../models/userModel");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      let user;
      if (jwt_payload.role === "admin") {
        user = await User.findById(jwt_payload.id);
      } else {
        user = await User.findById(jwt_payload.id);
      }

      if (!user) {
        return done(new Error("User not found"), null);
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

module.exports.isLogin = passport.authenticate("jwt", { session: false });

module.exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "คุณไม่มีสิทธิ์เข้าถึงในส่วนนี้" });
  }
};
