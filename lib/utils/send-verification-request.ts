import { User } from "better-auth";
import { resend } from "../resend";
import { EmailVerificationTemplate } from "@/components/email-templates/email-verification-template";

type Props = {
  user: User;
  url: string;
  token: string;
};

export const sendVerificationRequest = async ({ user, url, token }: Props) => {
  try {
    await resend.emails.send({
      from: "YOUR EMAIL FROM (eg: team@resend.com)",
      to: user.email,
      subject: "YOUR EMAIL SUBJECT",
      react: EmailVerificationTemplate({
        name: user.name,
      }) as React.ReactElement,
    });
  } catch (error) {
    console.log({ error });
  }
};
