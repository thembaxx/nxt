import { User } from "better-auth";
import { resend } from "../lib/resend";
import ResetPasswordEmailTemplate from "@/components/email-templates/reset-password-template";

type Props = {
  user: User;
  url: string;
  token: string;
};

export const sendResetPasswordRequest = async ({ user, url, token }: Props) => {
  try {
    const resp = await resend.emails.send({
      from: "NXT <support@nxt.io>",
      to: [user.email],
      subject: "NXT Password Reset",
      react: ResetPasswordEmailTemplate({
        name: user.name,
        link: url,
        token,
      }) as React.ReactElement,
    });
    console.log(resp);
    return resp;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
