import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pb-6 pt-0 gap-14 sm:px-16  font-[family-name:var(--font-geist-sans)]">
      <div className="text-center space-y-2">
        <p className="text-3xl mb-4">👋</p>
        <h1 className="text-2xl font-mono">
          Welcome <span className="font-medium">NXT—Lia</span>n
        </h1>
        <p className="text-sm text-neutral-400 text-pretty max-w-[275px]">
          Take a look around by logging in a playing some of my Demo projects.
        </p>
      </div>
      <div className="relative overflow-hidden">
        <Image
          aria-hidden
          src="/nxt-illustration.png"
          alt="Illustration"
          height={370}
          width={376}
        />
      </div>
      <Link
        href={"/login"}
        className="rounded-2xl relative bg-violet-600 shadow-2xl shadow-violet-400/30 space-x-3 font-medium py-2 pr-6 pl-3 items-center flex justify-center text-primary-white"
      >
        <div className="relative">
          <Image
            aria-hidden
            src="/icons/login-03-stroke-rounded.svg"
            alt="Login Icon"
            width={24}
            height={24}
          />
        </div>
        <span>Sign In</span>
      </Link>
    </div>
  );
}
