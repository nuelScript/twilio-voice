"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SignUpFormSchema } from "@/schema";
import { SignUpFormValues } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/actions/register";
import toast from "react-hot-toast";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { PasswordInputWithStrength } from "@/components/ui/password-input-with-strength";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error, {
          style: { backgroundColor: "red", color: "white" },
          icon: <CircleAlert />,
        });
      } else if (data.success) {
        toast.success(data.success);
        router.push("/sign-in");
      }
    },
    onError: () => {
      toast.error("An unexpected error occurred. Please try again.", {
        style: { backgroundColor: "red", color: "white" },
        icon: <CircleAlert />,
      });
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    mutate(data);
  };
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email address *"
                  type="email"
                  className="h-12 rounded-md"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          className={cn(
            "w-full h-12 rounded-md bg-blue-600 shadow-sm transition-all duration-300",
            "text-white font-medium flex items-center justify-center gap-2"
          )}
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
