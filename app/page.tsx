import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default async function Home() {
  const session = await authClient.getSession();
  console.debug(session);
  return (
    <div className="flex flex-col items-center h-full overflow-hidden justify-center pb-6 pt-0 gap-14 sm:px-16  font-[family-name:var(--font-geist-sans)]">
      <div className="text-center flex flex-col items-center space-y-2">
        <p className="text-3xl mb-4">👋</p>
        <h1 className="text-xl font-mono font-semibold">
          <span className="text-[10px] font-semibold uppercase text-neutral-300">
            Welcome
          </span>{" "}
          <span className="font-medium">NXT—Lia</span>n
        </h1>
        <p className="text-sm text-neutral-400 text-pretty max-w-[275px]">
          Take a look around by logging in a playing some of my Demo projects.
        </p>
        <div className="flex flex-col items-cente space-y-4 pt-6 w-48">
          {(!session || !session.data || !session.data.user) && (
            <Link
              href={"/login"}
              className="rounded-2xl w-full relative shadow-2xl space-x-2 font-medium py-2 pr-6 pl-2 items-center flex justify-center bg-[#fafafa] text-primary-foreground"
            >
              <div className="relative">
                <Image
                  aria-hidden
                  src="/icons/login-03-stroke-rounded.svg"
                  alt="Login Icon"
                  width={20}
                  height={20}
                />
              </div>
              <span className="text-sm">Sign In</span>
            </Link>
          )}

          <Link
            href={"/home"}
            className="rounded-2xl w-full relative shadow-2xl space-x-3 font-medium py-2 pr-6 pl-2 items-center flex justify-center bg-[#FFAB01] text-neutral-800"
          >
            <div className="relative">
              <Image
                aria-hidden
                src="/icons/code-square-stroke-rounded.svg"
                alt="Login Icon"
                width={20}
                height={20}
              />
            </div>
            <span className="text-sm">Browse Projects</span>
          </Link>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <Image
          aria-hidden
          src="/nxt-illustration.png"
          alt="Illustration"
          height={360}
          width={366}
        />
      </div>
    </div>
  );
}
