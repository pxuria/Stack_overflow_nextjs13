"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export async function getuserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
