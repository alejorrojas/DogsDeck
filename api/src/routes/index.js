const { Router } = require("express");

const controller = require("../controllers");

const router = Router();

router.get("/dogs", controller.dogs);

router.get("/dogs/:id", controller.dogsId);

router.get("/temperament", controller.temperaments);

router.post("/dog", controller.dogPost);

router.delete("/deleted/:id", controller.delete);

/* ENDPOINTS FILTRADOS */
router.get("/created", controller.filterCreated);

router.get("/api", controller.api);

module.exports = router;
