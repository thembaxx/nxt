"use client";

import SignInForm from "@/components/sign-in/sign-in-form";
import SignUpForm from "@/components/sign-up/sign-up-form";
import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SocialSignIn from "./social-sign-in";

function LoginPage() {
  return (
    <div className="px-6 flex  justify-center w-full">
      <div className="bg-[#0E0E0E] w-full max-w-[600px] md:max-w-sm rounded-xl p-4 shadow-xl">
        <Tabs
          defaultValue="sign-up"
          className="w-full flex flex-col items-center"
        >
          <TabsList className="mb-4 grid grid-cols-2 w-full md:max-w-[320px]">
            <TabsTrigger className="text-[13px]" value="sign-in">
              Sign In
            </TabsTrigger>
            <TabsTrigger className="text-[13px]" value="sign-up">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <>
              <SignInForm />
              <div className="space-y-8 mt-8">
                <div className="flex relative items-center justify-center">
                  <Separator />
                  <div className="text-neutral-500 absolute text-xs px-4 bg-[#0E0E0E]">
                    or
                  </div>
                </div>
                <SocialSignIn />
              </div>
            </>
          </TabsContent>
          <TabsContent value="sign-up">
            <>
              <SignUpForm />
            </>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginPage;
