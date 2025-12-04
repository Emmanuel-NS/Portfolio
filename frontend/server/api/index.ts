import type { RequestHandler } from "express";
import app from "../dist/index";

export default app as unknown as RequestHandler;
