import {
  EmailVerificationFormSchema,
  ForgotPasswordFormSchema,
  ResetPasswordFormSchema,
  SignInFormSchema,
  VerifyForgottenPasswordFormSchema,
} from "@/schema";
import * as z from "zod";

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export type EmailVerificationFormValues = z.infer<
  typeof EmailVerificationFormSchema
>;

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordFormSchema>;

export type VerifyForgottenPasswordFormValues = z.infer<
  typeof VerifyForgottenPasswordFormSchema
>;

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordFormSchema>;

export interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Transcript {
  id: string;
  callSid: string;
  text: string;
  sentiment: number;
  magnitude: number;
  createdAt: string;
}
