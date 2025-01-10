"use client";

import { CardWrapper } from "@/components/layout/auth/card-wrapper";
import { SignUpForm } from "@/components/layout/forms/sign-up-form";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";

const SignUpPage = () => {
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
                headerHeading="Hello There"
                headerLabel="Enter your personal details to create your account"
                href="/sign-in"
                hrefLabel="Already have an account?"
                hrefCTA="Login"
              >
                <SignUpForm />
              </CardWrapper>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignUpPage;
