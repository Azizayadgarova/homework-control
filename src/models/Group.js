import mongoose from "mongoose";

export default mongoose.model(
  "Group",
  new mongoose.Schema({
    name: String,
    days: [String],
    time: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  })
);
