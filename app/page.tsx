import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link
        href={"/login"}
        className="rounded-xl bg-[#fafafa] py-2 relative items-center shadow flex justify-center text-primary-foreground w-full"
      >
        <Image
          aria-hidden
          src="/icons/login-03-stroke-rounded.svg"
          alt="Login Icon"
          width={24}
          height={24}
          className="absolute left-3"
        />
        <span>Sign In</span>
      </Link>
    </div>
  );
}
