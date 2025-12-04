import express from "express";
import cors from "cors";
import { config } from "dotenv";
import type { Server } from "http";
import { publicRouter } from "./routes/public";
import { adminRouter } from "./routes/admin";
import { disconnectPrisma } from "./prismaClient";
import { ensureAdminSettings } from "./services/adminSettings";

config();

const app = express();

const adminSettingsReady = ensureAdminSettings();

app.use(cors());
app.use(express.json());

app.use((_req, _res, next) => {
  adminSettingsReady.then(() => next()).catch(next);
});

app.use("/api", publicRouter);
app.use("/api/admin", adminRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
});

let server: Server | null = null;

async function bootstrap() {
  await adminSettingsReady;
  const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
  server = app.listen(PORT, () => {
    console.log(`API server ready on http://localhost:${PORT}`);
  });
}

export default app;

if (!process.env.VERCEL) {
  bootstrap().catch((error) => {
    console.error("Failed to start API server", error);
    process.exit(1);
  });

  const gracefulShutdown = async () => {
    await disconnectPrisma();
    if (server) {
      server.close(() => process.exit(0));
    } else {
      process.exit(0);
    }
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
}
