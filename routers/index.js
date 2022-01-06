const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const Controllers = require("../controllers/controllers");
const router = express.Router();
router.post("/register", Controllers.register);
router.post("/login", Controllers.login);

router.use(authentication);
router.get("/heroes", Controllers.getHero);
router.post("/myheroes/:heroId", Controllers.addHero);
router.get("/myheroes", Controllers.findMyHero);

router.patch("/myheroes/:id", authorization, Controllers.playMyHero);
router.use(errorHandler);

module.exports = router;
