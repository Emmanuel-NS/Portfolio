import { z } from "zod";
import { ConsultingStatus, SocialLabel } from "./generated/prisma/enums";

export const heroContentSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  primaryCtaLabel: z.string().min(1),
  primaryCtaHref: z.string().min(1),
  secondaryCtaLabel: z.string().min(1),
  secondaryCtaHref: z.string().min(1),
});

const sortOrderSchema = z.number().int().nonnegative().default(0);

export const heroHighlightSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  sortOrder: sortOrderSchema.optional(),
});

export const heroSpotlightSchema = z.object({
  title: z.string().min(1),
  stat: z.string().min(1),
  descriptor: z.string().min(1),
  sortOrder: sortOrderSchema.optional(),
});

export const educationSchema = z.object({
  institution: z.string().min(1),
  credential: z.string().min(1),
  period: z.string().min(1),
  description: z.string().min(1),
  sortOrder: sortOrderSchema.optional(),
});

export const experienceSchema = z.object({
  role: z.string().min(1),
  organization: z.string().min(1),
  period: z.string().min(1),
  summary: z.string().min(1),
  sortOrder: sortOrderSchema.optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string().min(1)).min(1),
  link: z.string().min(1),
  impact: z.string().min(1),
  sortOrder: sortOrderSchema.optional(),
});

export const skillGroupSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
  sortOrder: sortOrderSchema.optional(),
});

export const achievementSchema = z.object({
  title: z.string().min(1),
  context: z.string().min(1),
  detail: z.string().min(1),
  sortOrder: sortOrderSchema.optional(),
});

export const consultingSchema = z.object({
  client: z.string().min(1),
  focus: z.string().min(1),
  description: z.string().min(1),
  status: z.nativeEnum(ConsultingStatus).optional(),
  sortOrder: sortOrderSchema.optional(),
});

const socialSchema = z.object({
  label: z.nativeEnum(SocialLabel),
  href: z.string().min(1),
  sortOrder: sortOrderSchema.optional(),
});

export const contactInfoSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  summary: z.string().min(1),
  email: z.string().email(),
  whatsappNumber: z.string().min(1),
  whatsappLink: z.string().min(1),
  whatsappAvailability: z.string().min(1),
  socials: z.array(socialSchema).min(1),
});

export type ResourceKey =
  | "hero-highlights"
  | "hero-spotlights"
  | "education"
  | "experience"
  | "projects"
  | "skill-groups"
  | "achievements"
  | "consulting";

export const resourceSchemas: Record<ResourceKey, z.ZodObject<any>> = {
  "hero-highlights": heroHighlightSchema,
  "hero-spotlights": heroSpotlightSchema,
  education: educationSchema,
  experience: experienceSchema,
  projects: projectSchema,
  "skill-groups": skillGroupSchema,
  achievements: achievementSchema,
  consulting: consultingSchema,
};
