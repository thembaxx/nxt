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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Loader from "@/components/ui/loader";
import ImageDragDrop from "../sign-up/image-drag-drop";

const formSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  accept_terms: z.boolean(),
  profile_pic: z.string().optional(),
});

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: loading,
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      accept_terms: true,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">First name</FormLabel>
                <FormControl>
                  <Input placeholder="John" className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
              <FormLabel className="font-medium flex-1">Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    className="text-base"
                    type={showPassword ? "text" : "new-password"}
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
                        aria-hidden={!showPassword}
                        src="/icons/view-off-stroke-rounded.svg"
                        alt="Hide password"
                        width={16}
                        height={16}
                      />
                    )}
                    {!showPassword && (
                      <Image
                        aria-hidden={showPassword}
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
          name="profile_pic"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center mb-3">
                <FormLabel className="flex-1">
                  Profile Image{" "}
                  <span className="font-normal text-neutral-500">{`(Optional)`}</span>
                </FormLabel>{" "}
                {field.value && (
                  <Button
                    type="button"
                    title="Delete"
                    variant="ghost"
                    size="sm"
                    onClick={() => form.resetField("profile_pic")}
                  >
                    <Image
                      src="/icons/delete-02-stroke-rounded.svg"
                      alt="Delete icon"
                      width={16}
                      height={16}
                    />
                  </Button>
                )}
              </div>
              <FormControl>
                <ImageDragDrop {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accept_terms"
          render={({ field }) => (
            <FormItem className="flex space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accept terms and conditions</FormLabel>
                <FormDescription>
                  You can read our terms and confitions{" "}
                  <a
                    href="/"
                    target="_blank"
                    rel="norefferer"
                    className="font-medium underline text-blue-400"
                  >
                    here
                  </a>
                  .
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="space-y-2 w-full">
          <Button type="submit" className="w-full relative">
            <span>Create an account</span>
            {loading && (
              <div className="absolute left-2">
                <Loader />
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SignUpForm;
