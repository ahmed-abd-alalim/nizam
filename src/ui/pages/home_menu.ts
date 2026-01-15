import { select } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";

export async function HomeMenu() {
  const ctx = useContext();
  const question_theme = {
    icon: {
      cursor: "➤ ",
    },
    prefix: {
      idle: "",
      done: "",
    },
    style: {
      message: (text: any) => chalk.blueBright(text),
      answer: () => "",
      description: (text: any) => chalk.yellowBright(`[!] ${text}`),
    },
  };

  const run = await select({
    message: "",
    loop: false,
    choices: [
      {
        name: "[🔍] Browse Mode",
        value: "Browse Mode",
        description:
          "Multiple options with the ability to search or browse through comprehensive lists. Useful if you know which tools you'll be using.",
      },
      {
        name: "[❓] OneShot Mode",
        value: "OneShot Mode",

        description: `A series of questions that suggest suitable options when you are unsure which tools to use. ${chalk.redBright("If this is your first time, we recommend checking out the")} ${chalk.redBright.bold("Help menu")} ${chalk.redBright("to understand the questions and suggestions contained therein.")}`,
      },
      {
        name: "[🚨] Help",
        value: "Help",

        description:
          "It provides you with support and guidance, with an explanation of each question and the options that will be displayed, to make it easier to understand and use the tool.",
      },
      {
        name: "[📤] Exit",
        value: "Exit",
        description: "",
      },
    ],
    theme: question_theme,
  });

  ctx.start_menu_options = run;
}
