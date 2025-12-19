import { select } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../core/context/runtime.js";

export async function start() {
  const ctx = useContext();
  const question_theme = {
    prefix: {
      idle: "",
      done: "",
    },
    style: {
      message: (text: any) => chalk.blueBright(text),
      answer: () => "",
    },
  };

  console.clear();

  const run = await select({
    message: `
${chalk.bold.green("###################")}
${chalk.yellowBright("Welcome In Bango")}
${chalk.bold.green("###################")}`,
    choices: ["Start", "Help", "Exit"],
    theme: question_theme,
  });

  ctx.start_menu_options = run;
}
