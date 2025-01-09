"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SignInFormSchema } from "@/schema";
import { SignInFormValues } from "@/types";
import { AuthError } from "next-auth";

export const login = async (
  data: SignInFormValues
): Promise<{ error?: string; success?: string }> => {
  const validatedFields = SignInFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Incorrect Details. Please try again." };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return {
      error: "Account with this email does not exist.",
    };
  }

  if (user.emailVerified === "false") {
    const verificationToken = await generateVerificationToken(user.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Account not verified. Verification email sent." };
  }

  try {
    const result = await signIn("credentials", {
      email: user.email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Incorrect Details. Please try again." };
    }

    return { success: "Logged in successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong." };
      }
    }

    throw error;
  }
};
