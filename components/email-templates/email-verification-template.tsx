interface EmailTemplateProps {
  name: string;
  url: string;
  token: string;
}

export const EmailVerificationTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ name }: EmailTemplateProps): React.ReactNode => (
  <div>
    <h1>Welcome, {name}!</h1>
  </div>
);
