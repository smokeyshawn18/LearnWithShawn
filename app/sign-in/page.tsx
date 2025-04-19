import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import React from "react";

const page = async () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Please Sign In To Start Learning from today!
      </h1>

      <SignInButton mode="modal">
        <Button>Sign In</Button>
      </SignInButton>
    </div>
  );
};

export default page;
