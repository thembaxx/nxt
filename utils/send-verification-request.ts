import { User } from "better-auth";
import { resend } from "../lib/resend";
import { EmailVerificationTemplate } from "@/components/email-templates/email-verification-template";

type Props = {
  user: User;
  url: string;
  token: string;
};

export const sendVerificationRequest = async ({ user, url, token }: Props) => {
  try {
    await resend.emails.send({
      from: "NXT Gamma <me@themba.dev>",
      to: user.email,
      subject: "Verify your account",
      react: EmailVerificationTemplate({
        name: user.name,
        url,
        token,
      }) as React.ReactElement,
    });
  } catch (error) {
    console.log({ error });
  }
};
