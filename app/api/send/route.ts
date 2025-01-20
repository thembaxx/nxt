import ResetPasswordEmailTemplate from "@/components/email-templates/reset-password-template";
import { resend } from "@/lib/resend";

export async function POST() {
  try {
    console.log("POST send route");
    const { data, error } = await resend.emails.send({
      from: "NXT <support@nxt.io>",
      to: ["mndebele.themba@gmail.com"],
      subject: "Hello world",
      react: ResetPasswordEmailTemplate({
        name: "Themba Mndebele",
        link: "http://localhost:3000/api/auth/reset-password/aJZgmc5LBXIc1xmXEhacdOYX?callbackURL=/reset-password",
        token: "aJZgmc5LBXIc1xmXEhacdOYX",
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
