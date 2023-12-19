const { Router } = require("express");
const composeController = require("../controllers/composeController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = Router();

router.post("/compose", requireAuth, composeController.journalPost);

module.exports = router;
