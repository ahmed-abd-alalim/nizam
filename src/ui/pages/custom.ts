import { select, confirm, Separator } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";
import { user_options_type } from "../../assets/type.js";

export async function Custom() {
  const ctx = useContext();
  const user_options: (string[] | [string, boolean])[] = [];
  const question_theme = {
    prefix: {
      idle: `${chalk.yellowBright("[")}${chalk.blueBright(
        "?"
      )}${chalk.yellowBright("]")}`,
      done: `${chalk.yellowBright("[")}${chalk.greenBright(
        "✔"
      )}${chalk.yellowBright("]")}`,
    },
    style: {
      message: (text: any) => chalk.blueBright(text),
      answer: (text: any) => chalk.greenBright(text),
    },
  };

  const nizam_choices = {
    js_framework: [
      new Separator(chalk.gray("--- Popular Options ---")),
      "React + vite + js",
      "React + vite + ts",
    ],
    css_framework: [
      new Separator(chalk.gray("--- Popular Options ---")),
      "Bootstrap",
      "Tailwindcss",
    ],
  };

  const check_is_Ok = async (qu_title: string) => {
    return await confirm({
      message: `Do you want use ${qu_title}?`,
      default: false,
      theme: question_theme,
    });
  };

  const custom_options = async () => {
    user_options.push([
      "js_framework",
      await select({
        message: "Select a js framework:",
        choices: nizam_choices.js_framework,
        pageSize: 5,
        theme: question_theme,
      }),
    ]);

    if (await check_is_Ok("CSS framework")) {
      user_options.push([
        "CSS_framework",
        await select({
          message: "Select a CSS framework:",
          choices: nizam_choices.css_framework,
          pageSize: 5,
          theme: question_theme,
        }),
      ]);
    }
  };

  await custom_options();
  const user_options_conv: user_options_type = Object.fromEntries(user_options);
  ctx.user_options = { ...ctx.user_options, ...user_options_conv };
}
