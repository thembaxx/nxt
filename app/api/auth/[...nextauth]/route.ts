import { handlers } from "@/auth";
export const { GET, POST } = handlers;

import type { User } from "@/lib/definitions";
import { db } from "@vercel/postgres";
import { put, del, list, ListBlobResult } from "@vercel/blob";
import bcryptjs from "bcryptjs";

const client = await db.connect();

async function getUser(email: string) {
  if (!client) return;

  try {
    const user =
      await client.sql<User>`SELECT * FROM users WHERE email=${email}`;
    return Response.json({ data: user.rows[0], status: 200 });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return Response.json({ error, status: 500 });
  }
}

export default async function createAccount(user: User) {
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

    const hashedPassword = await bcryptjs.hash(user.password, 10);
    const full_name = `${user.first_name} ${user.last_name}`;

    const resp = await client.sql`
      INSERT INTO users (first_name, last_name, full_name, email, password)
        VALUES (${user.first_name}, ${user.last_name}, ${full_name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (email) DO NOTHING
        RETURNING *;
        `;

    if (user.file && resp && resp.rows) {
      const blob = await put(user.image_url, user.file, {
        access: "public",
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent);
        },
      });

      const account = resp.rows[0] as User;

      if (account && blob && blob.url) {
        await client.sql`
        UPDATE users
        SET image_url = ${blob.url}
        WHERE id = ${account.id};
        `;
      }
    }

    return {
      data: (resp?.rows[0] as User) ?? ({} as User),
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

async function deleteAllBlobs() {
  let cursor;

  do {
    const listResult: ListBlobResult = await list({
      cursor,
      limit: 1000,
    });

    if (listResult.blobs.length > 0) {
      await del(listResult.blobs.map((blob) => blob.url));
    }

    cursor = listResult.cursor;
  } while (cursor);

  console.log("All blobs were deleted");
}

deleteAllBlobs().catch((error) => {
  console.error("Error deleting blobs:", error);
});

export { getUser };
