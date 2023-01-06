import type { Request, Response } from "express";
import { generateCrackCommand, safeJoin } from "../helpers";
import util from "util";
import { readFile, writeFile } from "fs/promises";
const exec = util.promisify(require("child_process").exec);

export const crackHash = async (req: Request, res: Response) => {
  const { methodType, attackType, hash } = req.body;

  const crackCommand = generateCrackCommand({
    methodType,
    attackType,
  });
  console.info(crackCommand);

  try {
    await writeFile(
      safeJoin("./src/hashcat-files/", "input.txt"),
      hash,
      "utf8"
    );

    const { stderr } = await exec(crackCommand);

    if (!!stderr && !stderr.includes("nvmlDeviceGetFanSpeed()")) {
      res.status(500).send({
        error: {
          message: `Sorry hashcat cracking proccess exited with error: ${stderr}`,
        },
      });
    }

    const output = await readFile(
      safeJoin("./src/hashcat-files/", "output.txt"),
      "utf8"
    );

    await writeFile(safeJoin("./src/hashcat-files/", "output.txt"), "", "utf8");

    if (!output) {
      res
        .status(500)
        .send({ error: { message: "Couldn't read cracked output" } });
    }

    res.status(200).send({ cracked: output.split(":")[1] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: { message: "Internal server error" } });
  }
};
