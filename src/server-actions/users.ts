"use server";

import { connectMongoDB } from "@/config/database";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

connectMongoDB();

export const getCurrentUserFromMongoDB = async () => {
  try {
    // get the clerk user data
    const clerkUser = await currentUser();
    const clerkUserId = clerkUser?.id;
    // check if the user exists in the database if yes return the user
    const user = await UserModel.findOne({ clerkUserId });
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }
    // if not create a new user in the database and return the user
    const userObj = {
      clerkUserId,
      name: clerkUser?.firstName + " " + clerkUser?.lastName,
      email: clerkUser?.emailAddresses[0].emailAddress,
      profilePictureUrl: clerkUser?.imageUrl,
      profileDataForResume: {},
    };

    const newUser = new UserModel(userObj);
    await newUser.save();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateUserProfile = async ({
  userId = "",
  data = {},
}: {
  userId: string;
  data: any;
}) => {
  try {
    const response = await UserModel.findByIdAndUpdate(userId, data);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(users)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
