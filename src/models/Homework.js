import mongoose from "mongoose";

export default mongoose.model(
  "Homework",
  new mongoose.Schema({
    title: String,
    description: String,
    lessonNumber: Number,
    deadline: Date,
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }
  })
);
