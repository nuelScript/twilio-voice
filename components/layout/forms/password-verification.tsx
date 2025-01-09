"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { CardWrapper } from "@/components/layout/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { EmailVerificationFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailVerificationFormSchema as VerifyForgottenPasswordFormSchema } from "@/schema";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const PasswordVerificationForm = () => {
  const form = useForm<EmailVerificationFormValues>({
    resolver: zodResolver(VerifyForgottenPasswordFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  return (
    <CardWrapper
      headerHeading="Verify Email Address"
      headerLabel="Please enter the code sent to your email address"
      href="/"
      hrefLabel="Didn't get the code?"
      hrefCTA="Resend"
      className="text-center"
    >
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-center space-y-8 -mt-12">
                <FormControl>
                  <InputOTP maxLength={6} {...field} disabled={isSubmitting}>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPGroup key={index}>
                        <InputOTPSlot
                          index={index}
                          className="w-12 h-12 sm:w-[56px] sm:h-[56px] rounded-[12px] text-[#6E3FF3] bg-white font-medium text-[28px]/[36px]"
                        />
                      </InputOTPGroup>
                    ))}
                  </InputOTP>
                </FormControl>
                <Button
                  type="submit"
                  className={cn(
                    "w-full h-12 rounded-md bg-[#DC0A00] shadow-sm transition-all duration-300",
                    "text-white font-medium flex items-center justify-center gap-2"
                  )}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
