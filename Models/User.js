import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
      unique: true,
    },
    password: { type: String, minlength: 6, select: true, required: true },
    profile: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);


UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("user", UserSchema);
