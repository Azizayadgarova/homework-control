import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student", "parent"],
      default: "student",
    },
    fullName: {
      type: String,
      trim: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 PASSWORD HASH (OSILIB QOLMAYDIGAN TO‘G‘RI USUL)
userSchema.pre("save", async function (next) {
  try {
    // Agar password o‘zgarmagan bo‘lsa, davom et
    if (!this.isModified("password")) {
      return next();
    }

    // Password hash
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// 🔑 PASSWORD TEKSHIRISH (LOGIN UCHUN QO‘SHIMCHA)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
