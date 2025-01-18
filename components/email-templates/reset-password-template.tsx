import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

type Props = {
  name: string;
  link: string;
  token: string;
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ResetPasswordEmailTemplate = ({ name, link }: Props) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            fontFamily: {
              sans: "ui-sans-serif, system-ui, sans-seri",
            },
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <Html className="font-sans">
        <Head />
        <Preview>NXT reset your password</Preview>
        <Body>
          <Container className="pt-8">
            <Img
              src={`${baseUrl}/static/logo.svg`}
              width={48}
              height={48}
              alt="NXT"
            />
            <Section className="pt-6">
              <Text>
                Hi <span className="font-medium">{name}</span>,
              </Text>
              <Text>
                Someone recently requested a password change for your NXT
                account. If this was you, you can{" "}
                <Link href={link} className="text-blue-600 font-medium">
                  Reset your password
                </Link>
              </Text>
              <Text>
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text className="mt-14 text-neutral-600 text-xs">
                © {new Date().getFullYear()} NXT
              </Text>
              <Link
                href="https://nxt-gamma.vercel.app/"
                className="text-blue-600 font-medium text-xs"
              >
                Visit NXT website
              </Link>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

ResetPasswordEmailTemplate.PreviewProps = {
  name: "Themba Mndebele",
  link: "http://localhost:3000",
} as Props;

export default ResetPasswordEmailTemplate;
