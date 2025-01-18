"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email(),
});

type Props = {
  setOpen: (value: boolean) => void;
};

function ForgotPasswordForm({ setOpen }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: loading,
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const { email } = values;
    await authClient.forgetPassword(
      {
        email,
        redirectTo: "/reset-password",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          setLoading(false);

          if (ctx && ctx.data && ctx.data.status) {
            setSuccess(true);
          }
        },
        onError: (ctx) => {
          //setError(ctx.error.message);
          setSuccess(false);
          // Handle the error
          if (ctx.error.status === 403) {
            alert("Please verify your email address");
          }
          //you can also show the original error message
          alert(ctx.error.message);
        },
      }
    );
  }

  return (
    <>
      {success && (
        <div className="space-y-6">
          <div className="py-2 px-3 bg-violet-600 rounded-xl border border-violet-600">
            <p className="text-sm text-pretty font-medium">
              An email has been sent to{" "}
              {form.getValues("email") ?? "the provided email"} , Please follow
              the istructions to reset your password.
            </p>
          </div>
          <Button
            variant="secondary"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Close
          </Button>
        </div>
      )}
      {!success && (
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2 w-full">
              <Button
                type="button"
                className="w-full relative"
                onClick={form.handleSubmit(onSubmit)}
              >
                {loading && (
                  <div className="absolute left-2">
                    <Loader />
                  </div>
                )}
                <span>Reset password</span>
              </Button>
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}

ForgotPasswordForm.displayName = "ForgotPasswordForm";

export default ForgotPasswordForm;
