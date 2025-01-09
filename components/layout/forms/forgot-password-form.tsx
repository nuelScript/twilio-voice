"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/layout/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { reset } from "@/actions/reset";
import { useTransition } from "react";
import toast from "react-hot-toast";

export const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    startTransition(async () => {
      const result = await reset(data);
      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
        form.reset();
      }
    });
  };

  return (
    <CardWrapper
      headerHeading="Forgot Password"
      headerLabel="Enter email address associated with your account"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email address"
                    type="email"
                    className="h-12 rounded-xl"
                    disabled={isPending}
                    aria-disabled={isPending}
                    {...field}
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
