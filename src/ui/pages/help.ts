import chalk from "chalk";
import { input } from "@inquirer/prompts";

export async function help() {
  console.log(`Help Menu for every question in nizam`);

  let back = false;
  while (!back) {
    await input({
      message: `
      \n\n[${chalk.redBright("!")}] Press the ${chalk.bgRedBright(
        "Enter key"
      )} to return to the home menu.
    `,
      theme: {
        prefix: {
          idle: ``,
          done: ``,
        },
      },
    });

    back = true;
  }
}
