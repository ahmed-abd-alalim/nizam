import { input, select, confirm, Separator } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";
import { user_options_type } from "../../assets/type.js";

export async function Core() {
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
    pkg_manager: [
      new Separator(chalk.gray("--- Available to you ---")),
      ...ctx.pkg_is_installed,
    ],
  };

  const core_options = async () => {
    user_options.push([
      "project_path",
      await input({
        message: "Project path (full path or . for current folder):",
        default: ".",
        theme: question_theme,
      }),
    ]);

    user_options.push([
      "project_name",
      await input({
        message: "Enter your project name:",
        default: "nizam-app",
        theme: question_theme,
      }),
    ]);

    user_options.push([
      "pkg_manager",
      await select({
        message: "Choose a package manager:",
        choices: nizam_choices.pkg_manager,
        default: "npm",
        pageSize: 5,
        theme: question_theme,
      }),
    ]);

    user_options.push([
      "add_aliase",
      await confirm({
        message: "Do you want add @ aliase?",
        default: false,
        theme: question_theme,
      }),
    ]);
  };

  await core_options();

  const user_options_conv: user_options_type = Object.fromEntries(user_options);
  ctx.user_options = { ...ctx.user_options, ...user_options_conv };
}
