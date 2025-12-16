import express from "express";
import { protect, allowRoles } from "../middlewares/authMiddleware.js";
import { createHomework, getHomeworksByGroup } from "../controllers/homeworkController.js";

const router = express.Router();

router.post("/", protect, allowRoles("teacher", "admin"), createHomework);
router.get("/:groupId", protect, getHomeworksByGroup);

export default router;
