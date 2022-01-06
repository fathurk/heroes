const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const authentication = async (req, res, next) => {
  try {
    let payload = await verifyToken(req.headers.access_token);
    let findUser = await User.findByPk(payload.id);
    if (payload.email !== findUser.email) {
      throw { name: "Invalid token" };
    }
    console.log(findUser);
    console.log(payload);
    req.user = {
      id: findUser.id,
      email: findUser.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
