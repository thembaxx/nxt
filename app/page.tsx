import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";
import Link from "next/link";

export default function Home() {
  useApi();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button className="rounded-full bg-[#fafafa]">
        <Link href={"/sign-in"}>Sign In</Link>
      </Button>
    </div>
  );
}
