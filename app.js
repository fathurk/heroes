const express = require("express");
const cors = require("cors");
const { comparePassword } = require("./helpers/bcrypt");
const { signToken } = require("./helpers/jwt");
const authentication = require("./middlewares/authentication");
const authorization = require("./middlewares/authorization");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { Hero, User, MyHero } = require("./models");
const errorHandler = require("./middlewares/errorHandler");
app.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let createUser = await User.create({ email, password });
    res.status(201).json({ id: createUser.id, email: createUser.email });
  } catch (err) {
    next(err);
  }
});
app.post("/login", async (req, res, next) => {
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
});

app.use(authentication);
app.get("/heroes", async (req, res, next) => {
  try {
    let getHero = await Hero.findAll();
    res.status(200).json(getHero);
  } catch (err) {
    next(err);
  }
});
app.post("/myheroes/:heroId", async (req, res, next) => {
  try {
    let createHero = await MyHero.create({
      UserId: req.user.id,
      HeroId: req.params.heroId,
    });
    res.status(201).json(createHero);
  } catch (err) {
    next(err);
  }
});
app.get("/myheroes", async (req, res, next) => {
  try {
    let findMyHero = await MyHero.findAll({
      where: { UserId: req.user.id },
      include: Hero,
    });
    res.status(200).json(findMyHero);
  } catch (err) {
    next(err);
  }
});

app.patch("/myheroes/:id", authorization, async (req, res, next) => {
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
});

app.use(errorHandler);
app.listen(port, () => `Listening on port ${port}`);
