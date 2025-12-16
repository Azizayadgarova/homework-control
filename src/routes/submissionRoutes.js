import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createSubmission, updateSubmission } from "../controllers/submissionController.js";

const router = express.Router();

router.post("/", protect, createSubmission);
router.put("/:id", protect, updateSubmission);

export default router;
