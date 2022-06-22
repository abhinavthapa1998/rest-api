const express = require("express");
const router = express.Router();
const AliensController = require("../controllers/aliens");

router.get("/", AliensController.get_all_aliens);
router.get("/:id", AliensController.get_alien_by_id);
router.post("/", AliensController.create_alien);
router.patch("/:id", AliensController.update_alien);
router.delete("/:id", AliensController.delete_alien);

module.exports = router;
