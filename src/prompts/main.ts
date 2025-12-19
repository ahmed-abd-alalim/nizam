import { input, select, confirm, Separator } from "@inquirer/prompts";
import chalk from "chalk";
import type { user_options_type } from "../assets/type.js";

export async function getPrompts(): Promise<user_options_type> {
  const user_options = [];

  user_options.push([
    "project_path",
    await input({
      message: chalk.cyanBright.bold(
        "\n[?] Project path (full path or . for current folder):"
      ),
      default: ".",
    }),
  ]);

  user_options.push([
    "project_name",
    await input({
      message: chalk.cyanBright.bold("\n[?] Enter your project name:"),
      default: "bango-app",
    }),
  ]);

  user_options.push([
    "js_framework",
    await select({
      message: chalk.greenBright("\n[?] Select a js framework:"),
      choices: [
        new Separator(chalk.gray("--- Popular Options ---")),
        "React + vite + js",
        "React + vite + ts",
      ],
      pageSize: 5,
    }),
  ]);

  user_options.push([
    "aliases",
    await confirm({
      message: chalk.blueBright("\n[?] Do you want add @ aliase?"),
      default: false,
    }),
  ]);

  user_options.push([
    "CSS_framework",
    await select({
      message: chalk.greenBright("\n[?] Select a CSS framework:"),
      choices: [
        new Separator(chalk.gray("--- Popular Options ---")),
        "Tailwind",
        "Bootstrap",
        "None",
      ],
      pageSize: 5,
    }),
  ]);

  user_options.push([
    "react_router",
    await confirm({
      message: chalk.blueBright("\n[?] Do you want React Router?"),
      default: false,
    }),
  ]);

  return Object.fromEntries(user_options);
}
