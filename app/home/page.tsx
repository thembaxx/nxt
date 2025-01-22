import VerifyEmail from "@/components/verify-email";
import Image from "next/image";
import Link from "next/link";

async function page() {
  return (
    <div className="flex justify-center">
      <div className="p-6 space-y-4 md:max-w-md">
        <VerifyEmail />
        <Link
          href="/channels"
          replace
          className="h-11 flex items-center relative justify-center rounded-full bg-secondary border border-neutral-700 shadow-md"
        >
          <Image
            aria-hidden
            src="/brands/ably.svg"
            alt="Ably logo"
            width={20}
            height={20}
            className="absolute left-4"
          />
          <span className="text-sm">Ably Channels</span>
        </Link>
      </div>
    </div>
  );
}

export default page;
