"use server";

import { User } from "better-auth";
import { resend } from "../resend";
import ResetPasswordEmailTemplate from "@/components/email-templates/reset-password-template";

type Props = {
  user: User;
  url: string;
  token: string;
};

export const sendResetPasswordRequest = async ({ user, url, token }: Props) => {
  try {
    console.log(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "NXT <support@nxt.io>",
      to: [user.email],
      subject: "NXT Password Reset",
      react: ResetPasswordEmailTemplate({
        name: user.name,
        link: url,
        token,
      }) as React.ReactElement,
    });
  } catch (error) {
    console.log({ error });
  }
};
