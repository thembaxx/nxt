"use client";
import { useState } from "react";

import { signIn } from "@/auth";
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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean(),
});

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] =
    useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: loading,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    await signIn("credentials");
    console.log(values);

    setLoading(false);
  }

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
                      disabled={loading}
                    >
                      Forgot your password?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-4 max-w-80 md:max-w-[420px] rounded-2xl">
                    <DialogHeader className="text-left mb-2">
                      <DialogTitle>Forgot password</DialogTitle>
                      <DialogDescription>
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
                    variant="ghost"
                    size="icon"
                    className="p-0 absolute h-full w-12 shrink-0 top-0 right-0 rounded-l-none"
                    type="button"
                    disabled={loading}
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
          <Button type="submit" className="w-full relative">
            {loading && (
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
