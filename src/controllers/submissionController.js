import Submission from "../models/Submission.js";

// Student: submit homework
export const createSubmission = async (req, res) => {
  try {
    const submission = await Submission.create({ ...req.body, student: req.user._id });
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: "Vazifa yuborishda xato" });
  }
};

// Teacher/Admin: update submission
export const updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: "Vazifa tahrirlashda xato" });
  }
};
