"use client";

import { newPassword } from "@/actions/new-password";
import { CardWrapper } from "@/components/layout/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInputWithStrength } from "@/components/ui/password-input-with-strength";
import { cn } from "@/lib/utils";
import { ResetPasswordFormSchema } from "@/schema";
import { ResetPasswordFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    startTransition(async () => {
      const result = await newPassword(data, token);
      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
        form.reset();
        router.replace("/sign-in");
      }
    });
  };

  return (
    <CardWrapper
      headerHeading="Reset Password"
      headerLabel="Enter a new password for your account"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInputWithStrength
                    placeholder="Password *"
                    className="h-12 rounded-md"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInputWithStrength
                    placeholder="Confirm password *"
                    className="h-12 rounded-md"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className={cn(
              "w-full h-12 rounded-md bg-[#DC0A00] shadow-sm transition-all duration-300",
              "text-white font-medium flex items-center justify-center gap-2"
            )}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
