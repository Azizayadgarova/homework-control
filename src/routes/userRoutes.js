import express from "express";
import {
  createUserByAdmin,
  getAllUsers,
  getUserById,
  updateUserRole,
  assignGroupToStudent,
} from "../controllers/userController.js";

import { protect, allowRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Faqat admin ishlatadi
router.use(protect, allowRoles("admin"));

// CRUD
router.post("/", createUserByAdmin);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id/role", updateUserRole);
router.put("/:id/group", assignGroupToStudent);

export default router;
