import { input, rawlist, confirm, Separator } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";
import { user_options_type } from "../../assets/type.js";
import { pathExists } from "../../utils/fs.js";

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
        validate: async (value) => {
          const regex = /^[a-z_-]+$/;
          if (!value) return "Folder name cannot be empty!";
          if (!regex.test(value))
            return "Only lowercase letters, _ and - are allowed!";
          if (await pathExists(`${ctx.full_project_path}${value}`))
            return "This name has been used before in the same route that was previously chosen.";
          return true;
        },
        theme: question_theme,
      }),
    ]);

    if (ctx.pkg_is_installed.length > 1) {
      user_options.push([
        "pkg_manager",
        await rawlist({
          message: "Choose a package manager:",
          choices: nizam_choices.pkg_manager,
          default: "npm",
          theme: question_theme,
        }),
      ]);
    } else ctx.user_options.pkg_manager = ctx.pkg_is_installed[0];

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
