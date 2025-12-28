import { select } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";

export async function HomeMenu() {
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

  const run = await select({
    message: "",
    choices: ["Search Mode", "Custom Mode", "Help", "Exit"],
    theme: question_theme,
  });

  ctx.start_menu_options = run;
}
