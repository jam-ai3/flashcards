"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies, headers } from "next/headers";
import { Session } from "./types";
import { APP_URL } from "./constants";
import { redirect } from "next/navigation";
import db from "@/db/db";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signToken(payload: Session) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );
  return Buffer.from(arrayBuffer).toString("hex");
}

export async function verifyPassword(password: string, hash: string) {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export async function getSession() {
  const head = await headers();
  const jwt = head
    .get("cookie")
    ?.split("; ")
    .filter((v) => v.startsWith(process.env.JWT_KEY!));
  if (jwt === undefined || jwt.length === 0) return null;

  const token = jwt[0].split("=")[1];
  if (!token) return null;

  const decoded = await verifyToken(token);
  if (!decoded) return null;
  const user = await db.user.findUnique({ where: { id: decoded.id } });
  if (!user) return null;
  return decoded;
}

export async function logoutAndRedirect(
  _: unknown,
  redirectTo: string = APP_URL
) {
  (await cookies()).set(process.env.JWT_KEY!, "", {
    path: "/",
    domain: process.env.DOMAIN,
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  redirect(redirectTo);
}
