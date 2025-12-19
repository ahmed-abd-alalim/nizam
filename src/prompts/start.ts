import { select } from "@inquirer/prompts";
import chalk from "chalk";

export async function start(): Promise<string> {
  console.clear();
  const run = await select({
    message: `
${chalk.bold.green("###################")}
${chalk.yellowBright("Welcome In Bango")}
${chalk.bold.green("###################\n")}`,
    choices: ["Start", "Help", "Exit"],
  });

  return run;
}
