"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/layout/auth/header";
import { Social } from "@/components/layout/auth/social";
// import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerHeading: string;
  showSocial?: boolean;
  href?: string;
  hrefCTA?: string;
  hrefLabel?: string;
  className?: string;
  backButton?: boolean;
  backButtonHref?: string;
  backButtonLabel?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  showSocial,
  headerHeading,
  href,
  hrefCTA,
  hrefLabel,
  className,
  backButton,
  backButtonHref = "",
  backButtonLabel = "",
}: CardWrapperProps) => {
  return (
    <Card className="border-none shadow-none p-0 w-full max-w-[454px] mx-auto h-full">
      <CardHeader className="">
        <Header heading={headerHeading} label={headerLabel} />
      </CardHeader>
      <CardContent className="p-0 mb-6">{children}</CardContent>
      {/* <div className="grid grid-cols-5 w-full">
        <div className="col-span-2">
          <Separator />
        </div>
        <div className="col-span-1">Or authorize with</div>
        <div className="col-span-2">
          <Separator />
        </div>
      </div> */}
      {showSocial && (
        <CardFooter className="p-0 mb-6">
          <Social />
        </CardFooter>
      )}
      {href && (
        <p
          className={cn(
            "text-base/[18px] font-normal text-[#0F132499]",
            className
          )}
        >
          {hrefLabel}{" "}
          <Link href={href}>
            <span className="text-blue-500">{hrefCTA}</span>
          </Link>
        </p>
      )}
      {backButton && (
        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      )}
    </Card>
  );
};
