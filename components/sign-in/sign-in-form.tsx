"use client";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Loader from "@/components/ui/loader";
import ForgotPasswordForm from "./forgot-password-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import { useUserContext } from "@/context/user-context";

const formSchema = z.object({
  email: z.string().email().default(""),
  password: z.string().min(6).default(""),
  rememberMe: z.boolean().default(false),
});

function SignInForm() {
  const userContext = useUserContext();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState<boolean | undefined>();
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] =
    useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: isPending,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setIsPending(true);
    const { email, password } = values;

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/home",
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: (ctx) => {
          setIsPending(false);

          if (ctx && ctx.data && ctx.data.user) {
            userContext.setUser(ctx.data.user);
          }

          toast("Success", { description: "Signed in successfuly" });
        },
        onError: (ctx) => {
          console.log(ctx);
          setIsPending(false);
          if (ctx.error.status === 403) {
            setError("Please verify your email address");
          } else {
            setError("Authentication failed, please try again");
          }
        },
      }
    );

    console.log(data, error);
  }

  // await authClient.sendVerificationEmail({
  //   email: "user@email.com",
  //   callbackURL: "/", // The redirect URL after verification
  // });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="font-medium flex-1">Password</FormLabel>
                <Dialog
                  open={forgotPasswordDialogOpen}
                  onOpenChange={setForgotPasswordDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-orange-300"
                      type="button"
                      disabled={isPending}
                    >
                      Forgot your password?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-4 max-w-80 md:max-w-[420px] rounded-2xl">
                    <DialogHeader className="text-left mb-2">
                      <DialogTitle>Forgot password?</DialogTitle>
                      <DialogDescription className="text-[12.8px] text-pretty">
                        An email with instructions on how to reset your password
                        will be sent to you.
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <ForgotPasswordForm
                        setOpen={setForgotPasswordDialogOpen}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    className="text-base"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="p-0 absolute h-full w-12 shrink-0 top-0 right-0 rounded-l-none"
                    type="button"
                    disabled={isPending}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword && (
                      <Image
                        aria-hidden
                        src="/icons/view-off-stroke-rounded.svg"
                        alt="Hide password"
                        width={16}
                        height={16}
                      />
                    )}
                    {!showPassword && (
                      <Image
                        aria-hidden
                        src="/icons/view-stroke-rounded.svg"
                        alt="Show password"
                        width={16}
                        height={16}
                      />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Remember me</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <div className="space-y-2 w-full">
          {error && (
            <div className="flex space-x-2 rounded-lg bg-red-100 border-2 border-red-400 py-2 px-3 ">
              <Image
                src="/icons/alert-circle-stroke-rounded.svg"
                alt="Error"
                width={16}
                height={16}
              />
              <p className="text-[12.6px] font-semibold text-red-500 ">
                {error}
              </p>
            </div>
          )}
          <Button type="submit" className="w-full relative">
            {isPending && (
              <div className="absolute left-2">
                <Loader />
              </div>
            )}
            <span>Sign in with Email</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

SignInForm.displayName = "SignInForm";

export default SignInForm;
