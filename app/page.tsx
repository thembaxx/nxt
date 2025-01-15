import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button className="rounded-full bg-[#fafafa] w-full">
        <Link href={"/login"}>Sign In</Link>
      </Button>
    </div>
  );
}
