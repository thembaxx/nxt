import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

// const { data, error } = await authClient.resetPassword({
//   newPassword: "password1234",
// });
