import { Button } from "@/components/ui/button";
import Image from "next/image";
import SignInForm from "@/components/ui/sign-in/sign-in-form";
import SignUpForm from "@/components/ui/sign-up/sign-up-form";
import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
const callbackURL = "/home";

function LoginPage() {
  return (
    <div className="p-6 pt-0 flex items-center justify-center h-full w-full">
      <div className="bg-[#0E0E0E] w-full max-w-[600px] rounded-xl p-4 shadow-lg">
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
                <div className="w-full space-y-2">
                  <Button
                    className="w-full rounded-full relative"
                    variant="outline"
                    type="button"
                    onClick={async () => {
                      "use server";
                      await authClient.signIn.social({
                        provider: "apple",
                        callbackURL,
                      });
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
                      await authClient.signIn.social({
                        provider: "google",
                        callbackURL,
                      });
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
                      await authClient.signIn.social({
                        provider: "facebook",
                        callbackURL,
                      });
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
              <SignUpForm />
            </>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginPage;
