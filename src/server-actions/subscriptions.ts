"use server";

import { connectMongoDB } from "@/config/database";
import UserModel from "@/models/user-model";
import SubscriptionModel from "@/models/subscription-model";
connectMongoDB();

export const saveUserSubscription = async ({
  userId,
  paymentId,
  amount,
}: {
  userId: string;
  paymentId: string;
  amount: number;
}) => {
  try {
    const newSubscription = new SubscriptionModel({
      user: userId,
      paymentId,
      amount,
    });
    await newSubscription.save();

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      currentSubscription: newSubscription,
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllSubscriptions = async () => {
  try {
    const response = await SubscriptionModel.find().populate("user").sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error: any) {
    return {
      success : false,
      message : error.message
    }
  }
}