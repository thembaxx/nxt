import { createAuthClient } from "better-auth/react";
import { anonymousClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL as string,
  plugins: [anonymousClient()],
});

type Provider =
  | "github"
  | "apple"
  | "discord"
  | "facebook"
  | "microsoft"
  | "google"
  | "spotify"
  | "twitch"
  | "twitter"
  | "dropbox"
  | "linkedin"
  | "gitlab"
  | "reddit";

export const socialSignIn = async (provider: Provider) => {
  return await authClient.signIn.social({
    provider: provider,
    callbackURL: "/home",
  });
};

// const { data, error } = await authClient.resetPassword({
//   newPassword: "password1234",
// });
