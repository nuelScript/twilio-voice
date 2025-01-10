"use client";

import { verifyEmail } from "@/actions/new-verification";
import { resendVerificationEmail } from "@/actions/resend-verification";
import { CardWrapper } from "@/components/layout/auth/card-wrapper";
import { FormError } from "@/components/layout/auth/form-error";
import { FormSuccess } from "@/components/layout/auth/form-success";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token not found!");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  const handleResend = useCallback(async () => {
    const email = searchParams.get("email");
    if (!email) {
      setError("Email not provided.");
      return;
    }

    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);

    try {
      const result = await resendVerificationEmail(email);
      if (result.success) {
        setSuccess(result.success);
      } else {
        setError(result.error);
      }
    } catch {
      setError("Failed to resend the email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerHeading="Verify Email Address"
      headerLabel={
        success
          ? "You have successfully created your account"
          : "Confirming your verification"
      }
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}

        <FormSuccess message={success} />
        <FormError message={error} />
      </div>

      {success && (
        <div className="w-full flex justify-center">
          <button
            onClick={() => router.push("/login")}
            className="mt-4 bg-[#DC0A00] shadow-sm transition-all duration-300 text-white px-4 py-2 rounded"
          >
            Continue to Login
          </button>
        </div>
      )}

      {error && (
        <div className="w-full flex justify-center">
          <button
            onClick={handleResend}
            className="mt-4 bg-[#DC0A00] shadow-sm transition-all duration-300 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Resending..." : "Resend Email"}
          </button>
        </div>
      )}
    </CardWrapper>
  );
};
