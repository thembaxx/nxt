import { handlers } from "@/auth";
export const { GET, POST } = handlers;

import type { User } from "@/lib/definitions";
import { db } from "@vercel/postgres";
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

async function createAccount(user: User) {
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
      user_password TEXT NOT NULL
      profile_pic_blob TEXT,
    );
  `;

    const hashedPassword = await bcryptjs.hash(user.password, 10);
    const resp = await client.sql`
        INSERT INTO users (first_name, last_name, full_name, email, user_password, profile_pic_blob)
        VALUES (${user.first_name}, ${user.last_name}, ${user.first_name} ${user.last_name}, ${user.email}, ${hashedPassword}, ${user.profile_pic_blob})
        ON CONFLICT (id) DO NOTHING;
      `;
    console.log({ resp });
    return Response.json({ data: resp.rows[0], status: 200 });
  } catch (error) {
    console.log("Failed to create account:", error);
    return Response.json({ error, status: 500 });
  }
}

export { createAccount, getUser };
