import { betterAuth } from "better-auth";
import { VercelPool } from "@vercel/postgres";
import { nextCookies } from "better-auth/next-js";

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
  },
  socialProviders: {
    apple: {
      clientId: process.env.AUTH_APPLE_ID,
      clientSecret: process.env.AUTH_APPLE_SECRET,
    },
    google: {
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    },
    facebook: {
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    },
  },
  plugins: [nextCookies()],
});
