"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SignInFormSchema } from "@/schema";
import { SignInFormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CircleAlert, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "@/actions/login";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error, {
          style: { backgroundColor: "red", color: "white" },
          icon: <CircleAlert />,
        });
      } else if (data.success) {
        toast.success(data.success);
        router.push(DEFAULT_LOGIN_REDIRECT);
      }
    },
    onError: () => {
      toast.error("An unexpected error occurred. Please try again.", {
        style: { backgroundColor: "red", color: "white" },
        icon: <CircleAlert />,
      });
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    mutate(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email address or Username"
                  type="text"
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
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    className="h-12 rounded-md pr-10 w-full"
                    disabled={isPending}
                    {...field}
                  />
                  <button
                    disabled={isPending}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </FormControl>
              <Button size="sm" variant="link" className="px-0" asChild>
                <Link href="/forgot-password">Forgot Password?</Link>
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type="submit"
          className={cn(
            "w-full h-12 rounded-md bg-blue-600 shadow-sm transition-all duration-300",
            "text-white font-medium flex items-center justify-center gap-2"
          )}
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              Signing in... <Loader2 className="size-5 animate-spin ml-2" />
            </div>
          ) : (
            "Sign In"
          )}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};
