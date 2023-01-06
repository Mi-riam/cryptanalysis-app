import { normalize, resolve } from "path";

enum AttackType {
  Straight = "0",
  Combination = "1",
  BruteForce = "3",
}

type CrackHashCommandConfig = {
  methodType: string;
  attackType: AttackType;
};

export const generateCrackCommand = (config: CrackHashCommandConfig) => {
  const methodType = config.methodType || "0";
  const attackType = config.attackType || AttackType.BruteForce;
  const inputPath = safeJoin("./src/hashcat-files/", "input.txt");
  const outputPath = safeJoin("./src/hashcat-files/", "output.txt");
  const dictionaryPath = safeJoin("./hashcat-6.2.6/", "example.dict");

  const exeOptionsMap = {
    [AttackType.Straight]: `-m${methodType} -a${attackType} ${inputPath} ${dictionaryPath} -o ${outputPath}`,
    [AttackType.Combination]: `-m${methodType} -a${attackType} ${inputPath} ${dictionaryPath} ${dictionaryPath} -o ${outputPath}`,
    [AttackType.BruteForce]: `-m${methodType} -a${attackType} ${inputPath} -o ${outputPath}`,
  };

  return `cd ./hashcat-6.2.6 & hashcat.exe ${exeOptionsMap[attackType]} --potfile-disable`;
};

export const safeJoin = (base: string, target: string) => {
  const targetPath = "." + normalize(`/${target}`);
  return resolve(base, targetPath);
};
