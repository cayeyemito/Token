import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

import type { AuthUser } from "@/lib/auth";

const JWT_EXPIRES_IN = "2h";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Falta la variable de entorno JWT_SECRET.");
  }

  return secret;
}

export function signAuthToken(user: AuthUser) {
  return jwt.sign(user, getJwtSecret() as Secret, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions);
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, getJwtSecret());
}
