import type { Request, Response } from "express";
// @ts-ignore
import timeout from "express-timeout-handler";

const options = {
  timeout: 300000, // 5 minutes
  onTimeout: (_req: Request, res: Response) => {
    res.status(503).send("Timeout. Please retry.");
  },
};

export const timeoutMiddleware = timeout.handler(options);
