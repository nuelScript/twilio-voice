import { Header } from "@/components/layout/auth/header";
import { BackButton } from "@/components/layout/auth/back-button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md mx-auto">
      <CardHeader>
        <Header heading="Error" label="Oops! Something went wrong!" />
      </CardHeader>
      <CardFooter>
        <BackButton href="/sign-in" label="Back to sign in" />
      </CardFooter>
    </Card>
  );
};
