import type { Request, Response } from "express";
import crypto from "crypto";

export const hashPassword = async (req: Request, res: Response) => {
  const { password, hashMode } = req.body;

  if (!hashMode || !password) {
    res
      .status(400)
      .send({ error: { message: "Bad request, missing some of the fields" } });
  }

  const hash = crypto.createHash(hashMode).update(password).digest("hex");

  res.status(200).send({ hash });
  try {
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: { message: "Internal server error" } });
  }
};
