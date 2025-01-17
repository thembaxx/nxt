"use client";

import { useState } from "react";

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
import ImageDragDrop from "./image-drag-drop";
import { User } from "@/lib/definitions";
import { toast } from "sonner";
import { UploadProgressEvent } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { authClient } from "@/lib/auth-client";
import { useUserContext } from "@/context/user-context";

const formSchema = z.object({
  first_name: z.string().min(2).default(""),
  last_name: z.string().min(2).default(""),
  email: z.string().email().default(""),
  password: z.string().min(6).default(""),
  accept_terms: z.boolean().default(true),
  file: z.custom<File>().optional(),
});

function SignUpForm() {
  const userContext = useUserContext();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [imageUploadProgress, setImageUploadProgress] =
    useState<UploadProgressEvent | null>(null);

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

  async function uploadImageAsync(file: File | undefined) {
    if (!file) return;

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        onUploadProgress: (progressEvent) => {
          setImageUploadProgress(progressEvent);
        },
      });

      return blob?.url;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(undefined);
    setLoading(true);

    const { first_name, last_name, email, password, accept_terms, file } =
      values;

    if (!accept_terms) return;

    const name = `${first_name} ${last_name}`;

    await authClient.signUp.email(
      {
        name,
        email,
        image: await uploadImageAsync(file),
        password,
        callbackURL: "/home",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          if (ctx && ctx.data) {
            const token = ctx.data?.token;
            const user = ctx.data?.user as User;
            console.log(user, token);

            if (user) {
              userContext.setUser(user);
            }
          }
          toast("Success", { description: "Account has been created." });

          setLoading(false);
        },
        onError: (ctx) => {
          toast("Error", { description: ctx.error.message });
          setError(ctx.error.message);
          setLoading(false);
        },
      }
    );
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                  <Button
                    variant="secondary"
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
          name="file"
          render={({ field }) => (
            <FormItem>
              <div className="mb-2">
                <FormLabel className="flex-1">
                  Profile Image{" "}
                  <span className="font-normal text-neutral-500">{`(Optional)`}</span>
                </FormLabel>
              </div>
              <FormControl>
                <ImageDragDrop
                  {...field}
                  uploadProgress={imageUploadProgress}
                  loading={loading}
                  onRemove={() => form.setValue("file", undefined)}
                />
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
          {error && (
            <p className="text-[12.6px] font-semibold text-red-500 rounded-lg bg-red-100 border-2 border-red-400 py-2 px-3">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full relative"
            disabled={!form.watch("accept_terms")}
          >
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

SignUpForm.displayName = "SignUpForm";

export default SignUpForm;
