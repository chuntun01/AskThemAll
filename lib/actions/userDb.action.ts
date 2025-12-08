// lib/actions/userDb.actions.ts
"use server";

import connectDB from "@/lib/db";
import UserModel, { IUser } from "@/lib/models/User";
import User from "@/lib/models/User";

export type UserDto = {
  id: string;
  clerkId: string;
  username: string;
  email: string;
  avatarUrl?: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UpsertUserPayload = {
  clerkId: string;
  email?: string | null;
  username?: string | null;
  avatarUrl?: string | null;
  isAdmin?: boolean;
};

export async function upsertUser(payload: UpsertUserPayload): Promise<UserDto> {
  const { clerkId, email, username, avatarUrl, isAdmin } = payload;

  if (!clerkId) {
    throw new Error("clerkId is required for upsertUser");
  }

  await connectDB();

  const doc = await UserModel.findOneAndUpdate(
    { clerkId },
    {
      $set: {
        ...(email != null && { email }),
        ...(username != null && { username }),
        ...(avatarUrl != null && { avatarUrl }),
        ...(typeof isAdmin === "boolean" && { isAdmin }),
      },
      $setOnInsert: {
        clerkId,
        isAdmin: typeof isAdmin === "boolean" ? isAdmin : false,
      },
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    }
  ).lean<IUser>();

  return {
    id: doc._id.toString(),
    clerkId: doc.clerkId,
    username: doc.username,
    email: doc.email,
    avatarUrl: doc.avatarUrl,
    isAdmin: !!doc.isAdmin,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
// lấy user trong Mongo theo clerkId (dùng cho API)
export async function getUserByClerkId(clerkId: string) {
  if (!clerkId) return null;

  await connectDB();

  const doc = await User.findOne({ clerkId }).lean();
  if (!doc) return null;

  return {
    id: doc._id.toString(),
    clerkId: doc.clerkId as string,
    username: doc.username as string,
    email: doc.email as string,
    isAdmin: doc.isAdmin as boolean,
    avatarUrl: doc.avatarUrl as string | undefined,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
