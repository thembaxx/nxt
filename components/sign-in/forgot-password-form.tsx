"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email(),
});

type Props = {
  setOpen: (value: boolean) => void;
};

function ForgotPasswordForm({ setOpen }: Props) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: loading,
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    console.log(values);

    setLoading(false);
    setOpen(false);
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
              <FormDescription>
                The email address for your account
              </FormDescription>
              <FormMessage />
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
  );
}

export default ForgotPasswordForm;
