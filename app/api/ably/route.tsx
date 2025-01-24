import Ably from "ably";

// ensure Vercel doesn't cache the result of this route,
// as otherwise the token request data will eventually become outdated
// and we won't be able to authenticate on the client side
export const revalidate = 0;

export async function GET() {
  const client = new Ably.Rest({
    key: process.env.ABLY_API_KEY,
    autoConnect: typeof window !== "undefined",
    // restHost: process.env.BETTER_AUTH_URL,
    // realtimeHost: process.env.BETTER_AUTH_URL,
  });
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "nxt_emerald", //process.env.AUTH_ABLY_CLIENT_ID
  });

  return Response.json(tokenRequestData);
}

// export async function GET() {
//   if (!process.env.AUTH_ABLY_CLIENT_ID || !process.env.ABLY_API_KEY) {
//     console.error(
//       ".env is not set: ",
//       process.env.AUTH_ABLY_CLIENT_ID,
//       process.env.ABLY_API_KEY
//     );

//     return {
//       statusCode: 500,
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify("VITE_ABLY_CHAT_API_KEY is not set"),
//     };
//   }

//   const clientId = process.env.AUTH_ABLY_CLIENT_ID || "NO_CLIENT_ID";
//   const client = new Ably.Rest({
//     key: process.env.ABLY_API_KEY,
//     restHost: process.env.BETTER_AUTH_URL,
//     realtimeHost: process.env.BETTER_AUTH_URL,
//   });

//   const tokenRequestData = await client.auth.createTokenRequest({
//     capability: {
//       "[chat]*": ["*"],
//       "*": ["*"],
//     },
//     clientId: clientId,
//   });

//   return Response.json(tokenRequestData);

//   return {
//     statusCode: 200,
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(tokenRequestData),
//   };
// }
