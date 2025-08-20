const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/userController");

// CRUD utilisateurs
router.post("/inscript", userCtrl.inscript);
router.post("/connect", userCtrl.connect);
router.get("/", userCtrl.listeUser);
router.put("/:id", userCtrl.modifUser);
router.delete("/:id", userCtrl.suppUser);

module.exports = router;
