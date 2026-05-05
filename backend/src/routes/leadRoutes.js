const express = require("express");

const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const {
  addNote,
  getNotesByLead,
} = require("../controllers/noteController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getLeads);
router.post("/", protect, createLead);
router.get("/:id", protect, getLeadById);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

router.get("/:id/notes", protect, getNotesByLead);
router.post("/:id/notes", protect, addNote);

module.exports = router;