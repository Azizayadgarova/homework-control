import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ADMIN REGISTER (FAQAT 1 MARTA)
export const register = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone va password majburiy" });
    }

    // Admin mavjudligini tekshirish
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      return res.status(403).json({
        message: "Admin allaqachon mavjud. Yangi admin ochib bo‘lmaydi ❌",
      });
    }

    const admin = await User.create({
      phone,
      password,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin muvaffaqiyatli yaratildi ✅",
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Admin registerda xato" });
  }
};

// ADMIN LOGIN (phone + password)
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user)
      return res.status(401).json({ message: "Login yoki parol xato" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Login yoki parol xato" });

    res.json({
      token: generateToken(user._id),
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Login xato" });
  }
};
