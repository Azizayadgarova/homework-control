import mongoose from "mongoose";

export default mongoose.model(
  "Submission",
  new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    homework: { type: mongoose.Schema.Types.ObjectId, ref: "Homework" },
    link: String,
    status: {
      type: String,
      enum: ["sent", "redo", "checked"],
      default: "sent"
    },
    score: Number,
    comment: String
  })
);
