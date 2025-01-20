import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2024-12-18.acacia",
  appInfo: {
    name: "NXT",
    url: "https://nxt-gamma.vercel.app/",
  },
});
