import * as z from "zod";

// Auth Schema

export const SignUpFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password has to be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|_<>])[A-Za-z\d!!@#$%^&*(),.?":{}|_<>]{8,}$/,
        "Minimum eight characters, at least one letter, one number and one special character"
      ),
    confirmPassword: z.string().min(1, "Confirm Password cannot be empty"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SignInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const EmailVerificationFormSchema = z.object({
  otp: z.string().length(6, "OTP has to be 6 characters"),
});

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email("Provide a valid email address"),
});

export const VerifyForgottenPasswordFormSchema = z.object({
  otp: z.string().length(6, "OTP has to be 6 characters"),
});

export const ResetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password has to be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|_<>])[A-Za-z\d!!@#$%^&*(),.?":{}|_<>]{8,}$/,
        "Minimum eight characters, at least one letter, one number and one special character"
      ),
    confirmPassword: z.string().min(1, "Confirm Password cannot be empty"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });
