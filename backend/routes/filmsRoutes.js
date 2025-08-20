const express = require("express");
const router = express.Router();
const filmCtrl = require("../controller/filmController");

router.post("/ajout", filmCtrl.ajout);
router.get("/", filmCtrl.listeFilm);
router.get("/:id", filmCtrl.recupFilm);
router.put("/:id", filmCtrl.modifFilm);
router.delete("/:id", filmCtrl.suppFilm);

module.exports = router;
