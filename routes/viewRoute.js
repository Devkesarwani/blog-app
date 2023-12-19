const { Router } = require("express");
const viewController = require("../controllers/viewController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = Router();

router.get("/journals", viewController.getJournals);
router.get("/journals/:postId", requireAuth, viewController.uniquePost);

module.exports = router;
