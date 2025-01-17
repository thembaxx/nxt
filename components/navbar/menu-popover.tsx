"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Logout03Icon } from "hugeicons-react";
import { Separator } from "@/components/ui/separator";
import { User } from "better-auth";

type Props = {
  user: User | null;
  open: boolean;
  setOpen(value: boolean): void;
};

function MenuPopover({ user, setOpen }: Props) {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full min-h-16">
      <Separator />
      {user && (
        <Button
          className="h-10 flex w-full justify-start items-center space-x-2 p-0 text-red-400 hover:bg-white/[0.03] hover:text-red-500 rounded-none px-4"
          variant="ghost"
          onClick={async () =>
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  setOpen(false);
                  router.push("/login"); // redirect to login page
                },
              },
            })
          }
        >
          <Logout03Icon
            strokeWidth={2}
            height={20}
            width={20}
            className="shrink-0"
          />
          <span className="font-semibold">Sign out</span>
        </Button>
      )}
    </div>
  );
}

export default MenuPopover;
