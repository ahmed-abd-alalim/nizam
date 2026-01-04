import {
  input,
  rawlist,
  confirm,
  Separator,
  checkbox,
} from "@inquirer/prompts";
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
  const checkbox_theme = {
    icon: {
      checked: ` ${chalk.greenBright("✔")} `,
      unchecked: ` ${chalk.redBright("✖")} `,
      pointer: "➤",
    },
    style: {
      message: (text: any) => chalk.blueBright(text),
      answer: (text: any) => chalk.greenBright(text),
      description: (text: any) => chalk.yellowBright(`[!] ${text}`),
      highlight: (text: any) => chalk.cyanBright(text),
    },
  };

  const nizam_choices = {
    pkg_manager: [
      new Separator(chalk.gray("--- Available to you ---")),
      ...ctx.pkg_is_installed,
    ],
    structure_method: [
      new Separator(chalk.gray("--- Available methods ---")),
      "nizam method",
      "custom method",
    ],

    // if i add hear nams for (file or folder) should add it in structure_react.ts file
    folders: [
      new Separator(chalk.gray("--- Select the folders you need ---")),
      { name: "pages", value: "pages", description: "app screens & routes" },
      {
        name: "layouts",
        value: "layouts",
        description: "page structure wrappers (header, footer, sidebar)",
      },
      {
        name: "components",
        value: "components",
        description: "reusable UI elements",
      },
      {
        name: "utils",
        value: "utils",
        description: "helper functions used everywhere",
      },
      {
        name: "storage",
        value: "storage",
        description: "saves & manages app data",
      },
    ],
    files: [
      new Separator(chalk.gray("--- Select the files you need ---")),
      {
        name: "config.json",
        value: "config.json",
        description: "global app settings & constants.",
      },
      {
        name: "api.json",
        value: "api.json",
        description: "API endpoints & base URLs.",
      },
      {
        name: "routing.json",
        value: "routing.json",
        description: "routes definitions & paths.",
      },
      {
        name: "icon.j/ts",
        value: "icon.j/ts",
        description: "centralized icon exports for easy reuse.",
      },
    ],
  };

  const check_is_Ok = async (qu_title: string) => {
    return await confirm({
      message: `Do you want use ${qu_title}?`,
      default: false,
      theme: question_theme,
    });
  };

  const core_options = async () => {
    user_options.push([
      "project_path",
      await input({
        message: "Project path (full path or . for current folder):",
        default: ".",
        validate: async (value) => {
          if (!(await pathExists(value))) return "Can't see your input path";
          return true;
        },
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
          if (!regex.test(value))
            return "Only lowercase letters, _ and - are allowed!";
          if (await pathExists(`${ctx.full_project_path}${value}`))
            return "This name has been used before in the same path that was previously chosen.";
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

    if (await check_is_Ok("Ready made app structure")) {
      const selectedMethod: string = await rawlist({
        message: "Choose app structure method:",
        choices: nizam_choices.structure_method,
        theme: question_theme,
      });

      if (selectedMethod === "custom method") {
        const selectedFolders: string[] = await checkbox({
          message: "Select folders:",
          choices: nizam_choices.folders,
          validate: async (value) => {
            if (value.length === 0) return "At least one should be chosen";
            return true;
          },
          theme: checkbox_theme,
        });

        const selectedFiles: string[] = await checkbox({
          message: "Select files:",
          choices: nizam_choices.files,
          validate: async (value) => {
            if (value.length === 0) return "At least one should be chosen";
            return true;
          },
          theme: checkbox_theme,
        });
        // @ts-ignore
        user_options.push(["folder_structure_names", selectedFolders]);
        // @ts-ignore
        user_options.push(["files_structure_names", selectedFiles]);
      }
      user_options.push(["app_structure", selectedMethod]);
    }
  };

  await core_options();

  const user_options_conv: user_options_type = Object.fromEntries(user_options);
  ctx.user_options = { ...ctx.user_options, ...user_options_conv };
}
