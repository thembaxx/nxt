import { createAuthClient } from "better-auth/react";
// export const authClient = createAuthClient({
//   baseURL:
//     process.env.NODE_ENV === "production"
//       ? "https://nxt-gamma.vercel.app"
//       : "http://localhost:3000",
// });

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL as string,
});

// const { data, error } = await authClient.resetPassword({
//   newPassword: "password1234",
// });
