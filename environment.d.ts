namespace NodeJS {
  interface ProcessEnv {
    AUTH_SECRET: string;
    // APPLE
    AUTH_APPLE_ID: string;
    AUTH_APPLE_SECRET: string;
    // GOOGLE
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    // FACEBOOK
    AUTH_FACEBOOK_ID: string;
    AUTH_FACEBOOK_SECRET: string;
    // POSTGRESS-NEON
    POSTGRES_URL: string;
    // RESEND
    RESEND_API_KEY: string;
    // STRIPE
    AUTH_STRIPE_PUBLISHABLE_KEY: string;
    AUTH_STRIPE_SECRET: string;
    // ABLY
    ABLY_API_KEY: string;
  }
}
