import { authenticator } from "otplib";
import { prisma } from "../prismaClient";
import { hashSecret } from "../security";

const ADMIN_SETTINGS_ID = 1;
const totpLabel = process.env.ADMIN_TOTP_LABEL ?? "Portfolio Admin";
const totpIssuer = process.env.ADMIN_TOTP_ISSUER ?? "Portfolio";

function requireEnv(name: "ADMIN_PASSCODE" | "ADMIN_TOTP_SECRET") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be defined`);
  }
  return value;
}

const initialTotpSecret = requireEnv("ADMIN_TOTP_SECRET");

export const getTotpMetadata = () => ({
  label: totpLabel,
  issuer: totpIssuer,
});

export const buildTotpSetupPayload = (secret: string) => ({
  secret,
  otpauthUrl: authenticator.keyuri(totpLabel, totpIssuer, secret),
  label: totpLabel,
  issuer: totpIssuer,
});

export async function ensureAdminSettings() {
  const existing = await prisma.adminSettings.findUnique({ where: { id: ADMIN_SETTINGS_ID } });
  if (existing) {
    return existing;
  }

  const passcode = requireEnv("ADMIN_PASSCODE");

  return prisma.adminSettings.create({
    data: {
      id: ADMIN_SETTINGS_ID,
      passcodeHash: await hashSecret(passcode),
      totpSecret: initialTotpSecret,
    },
  });
}

export async function getAdminSettingsStrict() {
  const settings = await prisma.adminSettings.findUnique({ where: { id: ADMIN_SETTINGS_ID } });
  if (!settings) {
    throw new Error("Admin settings are not initialized");
  }
  return settings;
}

export async function updateAdminSettings(data: { passcodeHash?: string; totpSecret?: string; twoFactorEnabled?: boolean }) {
  return prisma.adminSettings.update({
    where: { id: ADMIN_SETTINGS_ID },
    data,
  });
}

export function generateTotpSecret() {
  return authenticator.generateSecret();
}
