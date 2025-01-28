"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";

function VerifyEmail() {
  const session = authClient.useSession();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function resendEmail() {
    const user = session?.data?.user;
    if (!user || !user.email) return;

    const { email } = user;
    setError(null);
    setIsPending(true);

    await authClient.sendVerificationEmail(
      { email },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          setIsPending(false);
          setError(ctx.error.message);
        },
      }
    );
  }

  if (session?.data?.user?.isAnonymous) return null;

  if (!session || session.error || session?.data?.user?.emailVerified)
    return null;

  return (
    <div className="bg-neutral-900 border border-orange-300 shadow-lg rounded-2xl p-4">
      <div className="space-y-2">
        <h1 className="font-bold text-base">
          {"First, let's verify your email"}
        </h1>
        <div className="flex overflow-hidden mb-2">
          <p className="text-sm text-neutral-200 leading-5 font-medium text-pretty w-full truncate line-clamp-1">
            An email has been sent to
            <span className="font-semibold text-blue-500 text-xs truncate line-clamp-1">
              {session?.data?.user?.email ?? "you email"}
            </span>
          </p>
        </div>
        <p className="text-xs text-neutral-300  text-pretty w-full whitespace-pre-wrap overflow-hidden">
          click on the link in the email provided to verify your account and get
          started.
        </p>
      </div>
      <div className="pt-6 space-y-2">
        <p className="text-orange-300 text-[12.6px] font-medium">
          Did not receive email?
        </p>
        {error && (
          <p className="text-[12.6px] font-semibold text-red-500 rounded-xl bg-red-100 border-2 border-red-400 py-2 px-3">
            {error}
          </p>
        )}
        <Button className="rounded-lg relative w-full" onClick={resendEmail}>
          <div className="absolute left-3">{isPending && <Loader />}</div>
          <span>Resend email</span>
        </Button>
      </div>
    </div>
  );
}

export default VerifyEmail;
