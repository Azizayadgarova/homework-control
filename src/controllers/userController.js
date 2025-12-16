import User from "../models/User.js";

// Faqat yangi user qo‘shish (admin tashqari)
export const createUserByAdmin = async (req, res) => {
  try {
    const { fullName, phone, password, role } = req.body;

    if (!fullName || !password || !role || !phone) {
      return res.status(400).json({ message: "Maydonlar to‘liq emas" });
    }

    const allowedRoles = ["teacher", "student", "parent"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Role noto‘g‘ri" });
    }

    const user = await User.create({ fullName, phone, password, role });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User yaratishda xato" });
  }
};

// Barcha userlar
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Userlarni olishda xato" });
  }
};

// ID bo‘yicha user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User topilmadi" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Xato yuz berdi" });
  }
};

// Role o‘zgartirish
export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User topilmadi" });

    user.role = req.body.role;
    await user.save();
    res.json({ message: "Role yangilandi", user });
  } catch (error) {
    res.status(500).json({ message: "Role o‘zgartirishda xato" });
  }
};

// Studentga group biriktirish
export const assignGroupToStudent = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User topilmadi" });

    if (user.role !== "student") {
      return res
        .status(400)
        .json({ message: "Faqat studentga guruh biriktiriladi" });
    }

    user.group = req.body.groupId;
    await user.save();

    res.json({ message: "Guruh biriktirildi", user });
  } catch (error) {
    res.status(500).json({ message: "Guruh biriktirishda xato" });
  }
};
