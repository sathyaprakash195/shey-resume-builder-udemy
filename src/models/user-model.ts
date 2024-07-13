import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePictureUrl: {
      type: String,
      required: false,
    },
    profileDataForResume: {
      type: Object,
      required: false,
    },
    isAdmin: {
      default: false,
      type: Boolean,
      required: false,
    },
    currentSubscription: {
      default: null,
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.users) {
  delete mongoose.models.users;
}

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
