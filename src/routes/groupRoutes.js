import express from "express";
import { protect, allowRoles } from "../middlewares/authMiddleware.js";
import { createGroup, deleteGroup, updateGroupName } from "../controllers/groupController.js";

const router = express.Router();

// Admin faqat
router.post("/", protect, allowRoles("admin"), createGroup);
router.put("/:id", protect, allowRoles("admin"), updateGroupName);
router.delete("/:id", protect, allowRoles("admin"), deleteGroup);

export default router;
