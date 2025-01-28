import { db } from "@vercel/postgres";

const client = await db.connect();

async function seedUser() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS "user" (
      "id" VARCHAR(100) DEFAULT uuid_generate_v4(),
      name VARCHAR(255),
      email TEXT UNIQUE,
      "emailVerified" BOOLEAN,
      image TEXT,
      "createdAt" DATE DEFAULT NOW(),
      "updatedAt" DATE DEFAULT NOW(),
      "isAnonymous" BOOLEAN,
      PRIMARY KEY("id")
    );
  `;
}

async function seedSession() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS "session" (
      id VARCHAR(100) DEFAULT uuid_generate_v4() PRIMARY KEY,
      "userId" TEXT,
      token TEXT,
      "expiresAt" DATE,
      "ipAddress"	TEXT,
      "userAgent" TEXT,
      "createdAt" DATE DEFAULT NOW(),
      "updatedAt" DATE DEFAULT NOW(),
      FOREIGN KEY("userId")
        REFERENCES "user" (id)
    );
  `;
}

async function seedAccount() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS "account" (
      id VARCHAR(100) DEFAULT uuid_generate_v4() PRIMARY KEY,
      "userId" TEXT,
      "accountId" TEXT,
      "providerId" TEXT,
      "idToken" TEXT,
      "accessToken" TEXT,
      "refreshToken" TEXT,
      "accessTokenExpiresAt" DATE,
      "refreshTokenExpiresAt" DATE,
      "scope" TEXT,
      password TEXT,
      "createdAt" DATE DEFAULT NOW(),
      "updatedAt" DATE DEFAULT NOW(),
      FOREIGN KEY("userId")
        REFERENCES "user" (id)
    );
  `;
}

async function seedVerification() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS "verification" (
      id VARCHAR(100) DEFAULT uuid_generate_v4() PRIMARY KEY,
      "identifier" TEXT,
      "value" TEXT,   
      "expiresAt" DATE DEFAULT NOW(),
      "createdAt" DATE DEFAULT NOW(),
      "updatedAt" DATE DEFAULT NOW()
    );
  `;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUser();
    await seedSession();
    await seedAccount();
    await seedVerification();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
