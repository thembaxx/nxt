"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <div className="text-center">
        <h1 className="text-lg text-neutral-300 font-semibold">Oops!</h1>
        <div>
          <p className="text-orange-400 text-xs font-semibold mt-4 text-left">
            404
          </p>
          <h2 className="text-2xl font-bold font-mono text-neutral-300">
            Page Not Found
          </h2>
        </div>
      </div>
      <div className="shadow-xl">
        <Image src="/textures-2.png" alt="" height={256} width={256} />
      </div>
      <div className="text-center text-sm">
        <p className="font-medium text-neutral-200">
          We couldn't find the page you were looking for.
        </p>
        <p>
          Head back to the{" "}
          <Link href="/" className="underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
