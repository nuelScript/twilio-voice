"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const verifyEmail = async (token: string) => {
  const exisitingToken = await getVerificationTokenByToken(token);

  if (!exisitingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(exisitingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(exisitingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  if (existingUser.emailVerified === "true") {
    return { error: "Email is already verified!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: "true", email: exisitingToken.email },
  });

  await db.verificationToken.delete({
    where: { id: exisitingToken.id },
  });

  return { success: "Email verified successfully." };
};
