import { Separator } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";
import { user_options_type } from "../../assets/type.js";
import { pathExists } from "../../utils/fs.js";
import {
  confirm_fun,
  fun_input,
  rawlist_fun,
  check_is_Ok,
  checkbox_fun,
} from "./main.js";
export async function Core() {
  const ctx = useContext();
  const user_options: (string[] | [string, boolean] | [string, string[]])[] =
    [];

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
      {
        name: "sections",
        value: "sections",
        description: "contains reusable page sections",
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
        name: "icons.j/ts",
        value: "icons.j/ts",
        description: "centralized icons exports for easy reuse.",
      },
    ],
  };

  const core_options = async () => {
    user_options.push([
      "project_path",
      await fun_input(
        "Project path (full path or . for current folder):",
        ".",
        async (value: string) => {
          if (!(await pathExists(value))) return "Can't see your input path";
          return true;
        },
      ),
    ]);

    user_options.push([
      "project_name",
      await fun_input(
        "Enter your project name:",
        "nizam-app",
        async (value: string) => {
          const regex = /^[a-z_-]+$/;
          if (!regex.test(value))
            return "Only lowercase letters, _ and - are allowed!";
          if (await pathExists(`${ctx.full_project_path}${value}`))
            return "This name has been used before in the same path that was previously chosen.";
          return true;
        },
      ),
    ]);

    if (ctx.pkg_is_installed.length > 1) {
      user_options.push([
        "pkg_manager",
        await rawlist_fun(
          "Choose a package manager:",
          nizam_choices.pkg_manager,
        ),
      ]);
    } else ctx.user_options.pkg_manager = ctx.pkg_is_installed[0];

    user_options.push([
      "add_aliase",
      await confirm_fun("Do you want add @ aliase?", false),
    ]);

    if (await check_is_Ok("Ready made app structure")) {
      user_options.push([
        "app_structure",
        await rawlist_fun(
          "Choose app structure method:",
          nizam_choices.structure_method,
        ),
      ]);

      if (user_options.find((n) => n[1] === "custom method")) {
        user_options.push([
          "folder_structure_names",
          await checkbox_fun(
            "Select folders:",
            nizam_choices.folders,
            async (value: string[]) => {
              if (value.length === 0) return "At least one should be chosen";
              return true;
            },
          ),
        ]);
        user_options.push([
          "files_structure_names",
          await checkbox_fun(
            "Select files:",
            nizam_choices.files,
            async (value: string[]) => {
              if (value.length === 0) return "At least one should be chosen";
              return true;
            },
          ),
        ]);
      }
    }
  };

  await core_options();
  const user_options_conv: user_options_type = Object.fromEntries(user_options);
  ctx.user_options = { ...ctx.user_options, ...user_options_conv };
}
