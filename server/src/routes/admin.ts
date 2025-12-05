import { Router } from "express";
import { z } from "zod";
import { authenticator } from "otplib";
import { prisma } from "../prismaClient";
import {
  contactInfoSchema,
  heroContentSchema,
  resourceSchemas,
  ResourceKey,
} from "../schemas";
import { createAdminToken, hashSecret, requireAdminAuth, verifySecret } from "../security";
import {
  buildTotpSetupPayload,
  generateTotpSecret,
  getAdminSettingsStrict,
  updateAdminSettings,
} from "../services/adminSettings";

const adminRouter = Router();

const collectionDelegates: Record<ResourceKey, any> = {
  "hero-highlights": prisma.heroHighlight,
  "hero-spotlights": prisma.heroSpotlight,
  education: prisma.educationEntry,
  experience: prisma.experienceEntry,
  projects: prisma.project,
  "skill-groups": prisma.skillGroup,
  achievements: prisma.achievement,
  consulting: prisma.consultingProject,
};

function parseResource(param: string): ResourceKey | null {
  if (param in collectionDelegates) {
    return param as ResourceKey;
  }
  return null;
}

const loginSchema = z.object({
  passcode: z.string().min(4, "Passcode is required"),
  totpCode: z.string().min(6).optional(),
});

const updateSecuritySchema = z
  .object({
    currentPasscode: z.string().min(4, "Current passcode is required"),
    newPasscode: z.string().min(6).optional(),
    totpCode: z.string().min(6).optional(),
    twoFactorEnabled: z.boolean().optional(),
  })
  .refine(
    (value) => Boolean(value.newPasscode || typeof value.twoFactorEnabled === "boolean"),
    {
      message: "Provide at least one setting to update",
      path: ["newPasscode"],
    },
  );

const passcodeSchema = z.object({
  currentPasscode: z.string().min(4, "Current passcode is required"),
});

const serializeSettings = (settings: { twoFactorEnabled: boolean }) => ({
  twoFactorEnabled: settings.twoFactorEnabled,
});

adminRouter.get("/auth/status", async (_req, res, next) => {
  try {
    const settings = await getAdminSettingsStrict();
    return res.json(serializeSettings(settings));
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/auth/login", async (req, res, next) => {
  try {
    const { passcode, totpCode } = loginSchema.parse(req.body);
    const settings = await getAdminSettingsStrict();

    const passcodeValid = await verifySecret(passcode, settings.passcodeHash);
    if (!passcodeValid) {
      return res.status(401).json({ message: "Invalid passcode" });
    }

    if (settings.twoFactorEnabled) {
      if (!totpCode) {
        return res.status(400).json({ message: "Authenticator code required" });
      }
      const codeValid = authenticator.verify({ token: totpCode, secret: settings.totpSecret });
      if (!codeValid) {
        return res.status(401).json({ message: "Invalid authenticator code" });
      }
    }

    const token = createAdminToken({ sub: settings.id });
    return res.json({ token, ...serializeSettings(settings) });
  } catch (error) {
    next(error);
  }
});

adminRouter.use(requireAdminAuth);

adminRouter.get("/auth/settings", async (_req, res, next) => {
  try {
    const settings = await getAdminSettingsStrict();
    return res.json(serializeSettings(settings));
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/auth/settings", async (req, res, next) => {
  try {
    const payload = updateSecuritySchema.parse(req.body);
    const settings = await getAdminSettingsStrict();

    const currentValid = await verifySecret(payload.currentPasscode, settings.passcodeHash);
    if (!currentValid) {
      return res.status(401).json({ message: "Current passcode is incorrect" });
    }

    const nextSettings: {
      passcodeHash?: string;
      totpSecret?: string;
      twoFactorEnabled?: boolean;
    } = {};

    if (payload.newPasscode) {
      nextSettings.passcodeHash = await hashSecret(payload.newPasscode);
    }
    if (typeof payload.twoFactorEnabled === "boolean") {
      if (payload.twoFactorEnabled && !settings.twoFactorEnabled) {
        if (!payload.totpCode) {
          return res.status(400).json({ message: "Authenticator code required to enable 2FA" });
        }
        const valid = authenticator.verify({ token: payload.totpCode, secret: settings.totpSecret });
        if (!valid) {
          return res.status(401).json({ message: "Invalid authenticator code" });
        }
      }
      nextSettings.twoFactorEnabled = payload.twoFactorEnabled;
    }

    const updated = await updateAdminSettings(nextSettings);
    return res.json(serializeSettings(updated));
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/auth/totp/provision", async (req, res, next) => {
  try {
    const { currentPasscode } = passcodeSchema.parse(req.body);
    const settings = await getAdminSettingsStrict();
    const valid = await verifySecret(currentPasscode, settings.passcodeHash);
    if (!valid) {
      return res.status(401).json({ message: "Current passcode is incorrect" });
    }
    return res.json({ ...buildTotpSetupPayload(settings.totpSecret), ...serializeSettings(settings) });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/auth/totp/rotate", async (req, res, next) => {
  try {
    const { currentPasscode } = passcodeSchema.parse(req.body);
    const settings = await getAdminSettingsStrict();
    const valid = await verifySecret(currentPasscode, settings.passcodeHash);
    if (!valid) {
      return res.status(401).json({ message: "Current passcode is incorrect" });
    }
    const newSecret = generateTotpSecret();
    const updated = await updateAdminSettings({ totpSecret: newSecret, twoFactorEnabled: false });
    return res.json({ ...buildTotpSetupPayload(newSecret), ...serializeSettings(updated) });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/hero", async (_req, res, next) => {
  try {
    const hero = await prisma.heroContent.findFirst();
    return res.json(hero);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/hero", async (req, res, next) => {
  try {
    const payload = heroContentSchema.parse(req.body);
    const hero = await prisma.heroContent.upsert({
      where: { id: 1 },
      update: payload,
      create: { id: 1, ...payload },
    });
    return res.json(hero);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/contact", async (_req, res, next) => {
  try {
    const contact = await prisma.contactInfo.findFirst({
      include: { socials: { orderBy: { sortOrder: "asc" } } },
    });
    return res.json(contact);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/contact", async (req, res, next) => {
  try {
    const payload = contactInfoSchema.parse(req.body);
    const socials = payload.socials.map((social, index) => ({
      ...social,
      sortOrder: social.sortOrder ?? index + 1,
    }));

    const existing = await prisma.contactInfo.findFirst();

    const contactFields = {
      name: payload.name,
      tagline: payload.tagline,
      summary: payload.summary,
      email: payload.email,
      whatsappNumber: payload.whatsappNumber,
      whatsappLink: payload.whatsappLink,
      whatsappAvailability: payload.whatsappAvailability,
    };

    const contact = existing
      ? await prisma.contactInfo.update({
          where: { id: existing.id },
          data: {
            ...contactFields,
            socials: {
              deleteMany: {},
              create: socials,
            },
          },
          include: { socials: { orderBy: { sortOrder: "asc" } } },
        })
      : await prisma.contactInfo.create({
          data: {
            ...contactFields,
            socials: {
              create: socials,
            },
          },
          include: { socials: { orderBy: { sortOrder: "asc" } } },
        });

    return res.json(contact);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/:resource", async (req, res, next) => {
  try {
    const resource = parseResource(req.params.resource);
    if (!resource) {
      return res.status(404).json({ message: "Unknown resource" });
    }
    const delegate = collectionDelegates[resource];
    const items = await delegate.findMany({ orderBy: { sortOrder: "asc" } });
    return res.json(items);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/:resource", async (req, res, next) => {
  try {
    const resource = parseResource(req.params.resource);
    if (!resource) {
      return res.status(404).json({ message: "Unknown resource" });
    }
    const schema = resourceSchemas[resource];
    const payload = schema.parse(req.body);
    const delegate = collectionDelegates[resource];
    const created = await delegate.create({ data: payload });
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/:resource/:id", async (req, res, next) => {
  try {
    const resource = parseResource(req.params.resource);
    if (!resource) {
      return res.status(404).json({ message: "Unknown resource" });
    }
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid id parameter" });
    }
    const schema = resourceSchemas[resource].partial();
    const payload = schema.parse(req.body);
    const delegate = collectionDelegates[resource];
    const updated = await delegate.update({ where: { id }, data: payload });
    return res.json(updated);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/:resource/:id", async (req, res, next) => {
  try {
    const resource = parseResource(req.params.resource);
    if (!resource) {
      return res.status(404).json({ message: "Unknown resource" });
    }
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid id parameter" });
    }
    const delegate = collectionDelegates[resource];
    await delegate.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { adminRouter };
