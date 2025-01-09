"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SignUpFormSchema } from "@/schema";
import { SignUpFormValues } from "@/types";
import bcrypt from "bcryptjs";

export const register = async (data: SignUpFormValues) => {
  const validatedFields = SignUpFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Incorrect Details. Please try again." };
  }

  const { email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Account with this email already exists." };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      emailVerified: "false",
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email Sent!" };
};
