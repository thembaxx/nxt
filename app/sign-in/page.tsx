import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SignInForm from "@/components/sign-in/sign-in-form";
import SignUpForm from "@/components/sign-in/sign-up-form";
import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SignIn() {
  return (
    <div className="p-6 flex items-center justify-center h-full w-full">
      <div className="bg-[#0E0E0E] w-full max-w-[600px] rounded-xl p-4 shadow-lg">
        <Tabs
          defaultValue="sign-in"
          className="w-full flex flex-col items-center"
        >
          <TabsList className="mb-4 grid grid-cols-2 w-full max-w-[320px]">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <>
              <div className="mb-8">
                <p className="text-sm text-neutral-400">
                  Enter your email below to login to your account
                </p>
              </div>
              <SignInForm />
              <div className="space-y-8 mt-8">
                <div className="flex relative items-center justify-center">
                  <Separator />
                  <div className="text-neutral-500 absolute text-xs px-4 bg-[#0E0E0E]">
                    or
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <Button
                    className="w-full rounded-full relative"
                    variant="outline"
                    type="button"
                    onClick={async () => {
                      "use server";
                      await signIn("apple");
                    }}
                  >
                    <Image
                      aria-hidden
                      src="/brands/apple_dark.svg"
                      alt="Apple logo"
                      width={16}
                      height={16}
                      className="absolute left-3"
                    />
                    <span>Continue with Apple</span>
                  </Button>
                  <Button
                    className="w-full rounded-full relative"
                    variant="outline"
                    type="button"
                    onClick={async () => {
                      "use server";
                      await signIn("google");
                    }}
                  >
                    <Image
                      aria-hidden
                      src="/brands/google.svg"
                      alt="Google logo"
                      width={16}
                      height={16}
                      className="absolute left-3"
                    />
                    <span>Continue with Google</span>
                  </Button>
                  <Button
                    className="w-full rounded-full relative"
                    variant="outline"
                    type="button"
                    onClick={async () => {
                      "use server";
                      await signIn("facebook");
                    }}
                  >
                    <Image
                      aria-hidden
                      src="/brands/facebook.svg"
                      alt="Google logo"
                      width={16}
                      height={16}
                      className="absolute left-3"
                    />
                    <span>Continue with Facebook</span>
                  </Button>
                </div>
              </div>
            </>
          </TabsContent>
          <TabsContent value="sign-up">
            <>
              <div className="mb-8">
                <p className="text-sm text-neutral-400">
                  Enter your information to create an account
                </p>
              </div>
              <SignUpForm />
            </>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default SignIn;
