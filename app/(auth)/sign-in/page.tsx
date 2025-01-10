"use client";

import { CardWrapper } from "@/components/layout/auth/card-wrapper";
import { SignInForm } from "@/components/layout/forms/sign-in-form";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";

const SignInPage = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Card className="shadow-none w-full md:w-[1025px] border-none">
          <CardContent className="md:p-0">
            <div className="md:py-8">
              <CardWrapper
                showSocial
                headerHeading="Welcome Back"
                headerLabel="Enter your details to sign in to your account"
                href="/sign-up"
                hrefLabel="Don't have an account?"
                hrefCTA="Sign Up"
              >
                <SignInForm />
              </CardWrapper>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignInPage;
