import Homework from "../models/Homework.js";

// Teacher/Admin: create homework
export const createHomework = async (req, res) => {
  try {
    const homework = await Homework.create(req.body);
    res.json(homework);
  } catch (error) {
    res.status(500).json({ message: "Vazifa yaratishda xato" });
  }
};

// Guruh uchun homework
export const getHomeworksByGroup = async (req, res) => {
  try {
    const homeworks = await Homework.find({ group: req.params.groupId });
    res.json(homeworks);
  } catch (error) {
    res.status(500).json({ message: "Vazifalarni olishda xato" });
  }
};
