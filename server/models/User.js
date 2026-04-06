import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 24,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      maxlength: 280,
      default: "",
    },
    location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
      name: { type: String, default: "" },
    },
    favorites: [
      {
        type: { type: String, enum: ["star", "constellation"] },
        targetId: String,
        name: String,
        addedAt: { type: Date, default: Date.now },
      },
    ],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    totalObservations: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toPublicJSON = function () {
  return {
    _id: this._id,
    username: this.username,
    avatar: this.avatar,
    bio: this.bio,
    location: this.location,
    favorites: this.favorites,
    totalObservations: this.totalObservations,
    createdAt: this.createdAt,
  };
};

export default mongoose.model("User", userSchema);
