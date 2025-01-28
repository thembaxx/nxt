import { betterAuth } from "better-auth";
import { VercelPool } from "@vercel/postgres";
import { nextCookies } from "better-auth/next-js";
import { sendVerificationRequest } from "../utils/send-verification-request";
import { sendResetPasswordRequest } from "../utils/send-reset-password-request";
import { anonymous } from "better-auth/plugins";

export const auth = betterAuth({
  database: new VercelPool({
    connectionString: process.env.POSTGRES_URL,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendResetPasswordRequest({ user, url, token });
    },
  },
  requireEmailVerification: true,
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendVerificationRequest({ user, url, token });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    },
    github: {
      clientId: process.env.AUTH_GIT_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies(), anonymous()],
});
