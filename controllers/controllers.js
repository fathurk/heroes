const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const { Hero, User, MyHero } = require("../models");

class Controllers {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      let createUser = await User.create({ email, password });
      res.status(201).json({ id: createUser.id, email: createUser.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      let findUser = await User.findOne({ where: { email: req.body.email } });
      if (!comparePassword(req.body.password, findUser.password)) {
        console.log(req.body.password);
        console.log(comparePassword(req.body.password, findUser.password));
        throw { name: "Unauthorized" };
      }
      let access_token = await signToken({
        id: findUser.id,
        email: findUser.email,
      });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async getHero(req, res, next) {
    try {
      let getHero = await Hero.findAll();
      res.status(200).json(getHero);
    } catch (err) {
      next(err);
    }
  }

  static async addHero(req, res, next) {
    try {
      let createHero = await MyHero.create({
        UserId: req.user.id,
        HeroId: req.params.heroId,
      });
      res.status(201).json(createHero);
    } catch (err) {
      next(err);
    }
  }

  static async findMyHero(req, res, next) {
    try {
      let findMyHero = await MyHero.findAll({
        where: { UserId: req.user.id },
        include: Hero,
      });
      res.status(200).json(findMyHero);
    } catch (err) {
      next(err);
    }
  }

  static async playMyHero(req, res, next) {
    try {
      let findMyHero = await MyHero.findOne({
        where: { UserId: req.user.id, HeroId: req.params.id },
      });
      if (!findMyHero) {
        throw { name: "Hero not found" };
      }
      await MyHero.update(
        { status: "Played" },
        { where: { HeroId: req.params.id, UserId: req.user.id } }
      );
      res.status(200).json({ message: "Hero has been played" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controllers;
