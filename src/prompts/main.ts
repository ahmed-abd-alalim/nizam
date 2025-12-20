import { input, select, confirm, Separator } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../core/context/runtime.js";

export async function getPrompts() {
  const user_options = [];
  const ctx = useContext();
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
      default: "bango-app",
      theme: question_theme,
    }),
  ]);

  user_options.push([
    "pkg_manager",
    await select({
      message: "Choose a package manager:",
      choices: [
        new Separator(chalk.gray("--- Popular Options ---")),
        "npm",
        "bun",
        "pnpm",
        "yarn",
      ],
      default: "npm",
      pageSize: 5,
      theme: question_theme,
    }),
  ]);

  user_options.push([
    "js_framework",
    await select({
      message: "Select a js framework:",
      choices: [
        new Separator(chalk.gray("--- Popular Options ---")),
        "React + vite + js",
        "React + vite + ts",
      ],
      pageSize: 5,
      theme: question_theme,
    }),
  ]);

  user_options.push([
    "clean_app",
    await confirm({
      message: "Clean default Vite + React files?",
      default: false,
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

  user_options.push([
    "CSS_framework",
    await select({
      message: "Select a CSS framework:",
      choices: [
        new Separator(chalk.gray("--- Popular Options ---")),
        "Tailwind",
        "Bootstrap",
        "None",
      ],
      pageSize: 5,
      theme: question_theme,
    }),
  ]);

  user_options.push([
    "react_router",
    await confirm({
      message: "Do you want React Router?",
      default: false,
      theme: question_theme,
    }),
  ]);

  ctx.user_options = Object.fromEntries(user_options);
}
