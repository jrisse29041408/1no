CREATE TABLE "public"."User" (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL
);