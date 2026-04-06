import mongoose from "mongoose";

const observationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["star", "constellation"], required: true },
    targetId: { type: String, required: true },
    name: { type: String, required: true },
    note: { type: String, maxlength: 500, default: "" },
    location: {
      lat: Number,
      lng: Number,
      name: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Observation", observationSchema);
