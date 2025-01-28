"use client";

import { authClient, socialSignIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SocialSignIn() {
  const router = useRouter();

  return (
    <div className="w-full space-y-2">
      <Button
        className="w-full rounded-full relative"
        variant="outline"
        type="button"
        onClick={async () => {
          const user = await authClient.signIn.anonymous({ fetchOptions: {} });

          if (user) router.replace("/home");
        }}
      >
        <Image
          aria-hidden
          src="/icons/detective-fill.svg"
          alt="Detective logo"
          width={20}
          height={20}
          className="absolute left-3"
        />
        <span>Sign in anonymously</span>
      </Button>
      <Button
        className="w-full rounded-full relative"
        variant="outline"
        type="button"
        onClick={async () => {
          await socialSignIn("google");
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
          await socialSignIn("github");
        }}
      >
        <Image
          aria-hidden
          src="/brands/Github_dark.svg"
          alt="GitHub logo"
          width={16}
          height={16}
          className="absolute left-3"
        />
        <span>Continue with GitHub</span>
      </Button>
    </div>
  );
}

export default SocialSignIn;
