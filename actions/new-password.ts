"use server";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { ResetPasswordFormSchema } from "@/schema";
import { ResetPasswordFormValues } from "@/types";
import bcrypt from "bcryptjs";

export const newPassword = async (
  data: ResetPasswordFormValues,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = ResetPasswordFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Passwords don't match!" };
  }

  const { password } = validatedFields.data;

  const exisitingToken = await getPasswordResetTokenByToken(token);

  if (!exisitingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(exisitingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(exisitingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: exisitingToken.id },
  });

  return { success: "Password reset successfully!" };
};
