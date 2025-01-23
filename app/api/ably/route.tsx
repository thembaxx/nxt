import Ably from "ably";

// ensure Vercel doesn't cache the result of this route,
// as otherwise the token request data will eventually become outdated
// and we won't be able to authenticate on the client side
export const revalidate = 0;

export async function GET() {
  const client = new Ably.Rest({
    key: process.env.ABLY_API_KEY,
    autoConnect: typeof window !== "undefined",
  });
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "nxt_emerald",
  });
  return Response.json(tokenRequestData);
}
