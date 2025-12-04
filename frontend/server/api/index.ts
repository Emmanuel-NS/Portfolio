import type { RequestHandler } from "express";
import app from "../dist/index";

const handler = app as unknown as RequestHandler;

export default handler;
