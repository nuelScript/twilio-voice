"use server";

import { ForgotPasswordFormSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { ForgotPasswordFormValues } from "@/types";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (data: ForgotPasswordFormValues) => {
  const validatedFields = ForgotPasswordFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
