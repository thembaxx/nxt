import VerifyEmail from "@/components/verify-email";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function page() {
  return (
    <div className="flex justify-center">
      <div className="p-6 flex flex-col gap-3 overflow-hidden md:max-w-md">
        <VerifyEmail />
        <div className="grid grid-cols-2 w-full">
          <Link href="/channels" replace>
            <div className="group h-auto space-y-8 py-4 px-4 text-left relative justify-center rounded-xl bg-neutral-900 border border-neutral-800 shadow-md">
              <Image
                aria-hidden
                src="/brands/ably.svg"
                alt="Ably logo"
                width={24}
                height={24}
              />
              <div className="flex items-center space-x-4">
                <div className="space-y-1 grow">
                  <h3 className="text-sm font-medium">Ably Channels</h3>
                  <p className="whitespace-break-spaces text-[13px] font-normal text-muted-foreground">
                    Realtime chat
                  </p>
                </div>
                <ChevronRight
                  className="opacity-60 transition-transform group-hover:translate-x-0.5"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
