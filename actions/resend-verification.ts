"use server";

import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";

export const resendVerificationEmail = async (email: string) => {
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "No account found with this email." };
  }

  if (existingUser.emailVerified === "true") {
    return { error: "This email is already verified." };
  }

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Verification email resent!" };
};
