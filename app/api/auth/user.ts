"use server";

import type { User } from "@/lib/definitions";
import { db } from "@vercel/postgres";
import { hashPassword, compareHash } from "better-auth/crypto";

export async function createAccount(user: User) {
  const client = await db.connect();
  if (!client) return;

  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      image_url TEXT
    );
  `;

    const p = user.password;
    const hashedPassword = await hashPassword("abcdefgf");

    const isMatch = await compareHash("abcdefgf", hashedPassword);
    console.log(isMatch, p, hashedPassword);

    const full_name = `${user.first_name} ${user.last_name}`;

    const resp = await client.sql`
      INSERT INTO users (first_name, last_name, full_name, email, password)
        VALUES (${user.first_name}, ${user.last_name}, ${full_name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (email) DO NOTHING
        RETURNING *;
        `.catch((e) => console.error(e));

    let account = resp?.rows?.[0] as User;
    if (!resp || !account) {
      const userResp =
        await client.sql<User>`SELECT * FROM users WHERE email=${user.email}`;
      if (userResp && userResp.rows) {
        account = userResp.rows[0];
      }
    }

    return {
      data: account ?? ({} as User),
      error: "",
      status: 200,
    };
  } catch (error) {
    console.log("Failed to create account:", error);
    const err = error as Error;
    return {
      data: {} as User,
      error: err?.message ?? "Error creating account",
      status: 500,
    };
  }
}

export async function updateImageUrl(userId: string, url: string) {
  try {
    const client = await db.connect();
    await client.sql`
    UPDATE users
    SET image_url = ${url}
    WHERE id = ${userId};
    `;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// async function deleteAllBlobs() {
//   let cursor;

//   do {
//     const listResult: ListBlobResult = await list({
//       cursor,
//       limit: 1000,
//     });

//     if (listResult.blobs.length > 0) {
//       await del(listResult.blobs.map((blob) => blob.url));
//     }

//     cursor = listResult.cursor;
//   } while (cursor);

//   console.log("All blobs were deleted");
// }

// deleteAllBlobs().catch((error) => {
//   console.error("Error deleting blobs:", error);
// });
