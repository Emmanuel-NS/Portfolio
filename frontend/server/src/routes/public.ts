import { Router } from "express";
import { prisma } from "../prismaClient";

export const publicRouter = Router();

publicRouter.get("/content", async (_req, res, next) => {
  try {
    const [
      hero,
      heroHighlights,
      heroSpotlights,
      education,
      experience,
      projects,
      skillGroups,
      achievements,
      consultingProjects,
      contact,
    ] = await Promise.all([
      prisma.heroContent.findFirst(),
      prisma.heroHighlight.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.heroSpotlight.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.educationEntry.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.experienceEntry.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.skillGroup.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.achievement.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.consultingProject.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.contactInfo.findFirst({
        include: { socials: { orderBy: { sortOrder: "asc" } } },
      }),
    ]);

    return res.json({
      hero,
      heroHighlights,
      heroSpotlights,
      education,
      experience,
      projects,
      skillGroups,
      achievements,
      consultingProjects,
      contact,
    });
  } catch (error) {
    next(error);
  }
});
