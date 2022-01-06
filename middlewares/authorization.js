const { MyHero } = require("../models/index");
const authorization = async (req, res, next) => {
  try {
    console.log("ini req.params", req.params);
    let findMyHero = await MyHero.findOne({ where: { HeroId: req.params.id } });
    console.log("ini findMyHero", findMyHero);
    if (findMyHero.UserId !== req.user.id) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
