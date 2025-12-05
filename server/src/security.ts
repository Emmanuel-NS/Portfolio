import { config } from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

config();

const saltRounds = 12;
const sessionSecret = process.env.ADMIN_SESSION_SECRET ?? "";
const sessionTtlSeconds = process.env.ADMIN_SESSION_TTL ? Number(process.env.ADMIN_SESSION_TTL) : 60 * 60 * 12;

if (!sessionSecret) {
  throw new Error("ADMIN_SESSION_SECRET must be defined");
}

export async function hashSecret(secret: string) {
  return bcrypt.hash(secret, saltRounds);
}

export async function verifySecret(secret: string, hash: string) {
  return bcrypt.compare(secret, hash);
}

export type AdminTokenPayload = {
  sub: number;
};

export function createAdminToken(payload: AdminTokenPayload) {
  return jwt.sign(payload, sessionSecret, { expiresIn: sessionTtlSeconds });
}

export function verifyAdminToken(token: string) {
  const decoded = jwt.verify(token, sessionSecret);
  if (typeof decoded === "string") {
    throw new Error("Invalid admin token payload");
  }
  if (typeof decoded.sub !== "number") {
    throw new Error("Invalid admin token subject");
  }
  return decoded as AdminTokenPayload & jwt.JwtPayload;
}

declare module "express-serve-static-core" {
  interface Request {
    adminId?: number;
  }
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Admin session required" });
  }

  const token = header.slice(7);

  try {
    const payload = verifyAdminToken(token);
    req.adminId = payload.sub;
    return next();
  } catch (error) {
    console.error("Failed to verify admin token", error);
    return res.status(401).json({ message: "Invalid or expired admin session" });
  }
}
