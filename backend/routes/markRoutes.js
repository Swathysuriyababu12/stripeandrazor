const express = require("express");
const router = express.Router();
const {
  getMarks,
  createMark,
  updateMark,
  deleteMark,
} = require("../controllers/markdownController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMarks).post(protect, createMark);
router.route("/:id").put(protect, updateMark).delete(protect, deleteMark);

module.exports = router;
