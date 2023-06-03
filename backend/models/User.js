import mongoose from "mongoose";
//Esquema de usuario en base de datos MongoDB
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    preferences: {
      type: Array,
      default: [],
    },
    location: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);
//Modelo usuario para operaciones CRUD
const User = mongoose.model("User", UserSchema);

export default User;
