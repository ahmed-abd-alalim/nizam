#!/usr/bin/env node

import {
  sectionBox,
  intro,
  Core,
  Custom,
  help,
  HomeMenu,
  Search,
  printMenu,
  askAboutInstall,
  finalInstructure,
} from "../ui/index.js";
import { execSync } from "child_process";
import chalk from "chalk";
import { Setup } from "../core/setup.js";
import { createContext } from "../core/context/create.js";
import { startProject, resetContext } from "../core/context/runtime.js";
import { say } from "../ui/index.js";
import { removeAppFolder } from "../utils/remove_app_folder.js";

const clearConsole = async () => {
  if (process.platform === "win32") {
    execSync("cls", { stdio: "inherit" });
  } else {
    execSync("clear", { stdio: "inherit" });
  }
};

async function main() {
  const ctx = createContext();
  startProject(ctx);

  const search_mode_colle = async () => {
    await clearConsole();
    sectionBox("Browse Mode".toUpperCase());
    await Search();
    await Core();
    await clearConsole();

    await printMenu();
    if (ctx.reset_menu) {
      await resetContext();
      ctx.reset_menu = false;
      return;
    }

    await clearConsole();
    sectionBox("Installation".toUpperCase());
    await Setup();
    await askAboutInstall();
    await clearConsole();
    sectionBox("nizam success".toUpperCase());
    await finalInstructure();
    process.exit(0);
  };

  const custom_mode_colle = async () => {
    await clearConsole();
    sectionBox("OneShot Mode".toUpperCase());
    await Core();
    await Custom();
    await clearConsole();

    await printMenu();
    if (ctx.reset_menu) {
      await resetContext();
      ctx.reset_menu = false;
      return;
    }

    await clearConsole();
    sectionBox("Installation".toUpperCase());
    await Setup();
    await askAboutInstall();
    await clearConsole();
    sectionBox("nizam success".toUpperCase());
    await finalInstructure();
    process.exit(0);
  };

  const help_colle = async () => {
    clearConsole();
    sectionBox("Help".toUpperCase());
    await help();
  };

  const exit_colle = async () => {
    clearConsole();
    await say(`See you soon... `);
    await new Promise((r) => setTimeout(r, 1500));
  };

  try {
    await intro();

    while (true) {
      clearConsole();
      sectionBox("Home".toUpperCase());
      await HomeMenu();
      switch (ctx.start_menu_options) {
        case "Browse Mode":
          await search_mode_colle();
          break;
        case "OneShot Mode":
          await custom_mode_colle();
          break;
        case "Help":
          await help_colle();
          break;
        case "Exit":
          await exit_colle();
          return;
      }
    }
  } catch (err: any) {
    if (err.name === "ExitPromptError") {
      await say(`Good Bay...`);
      await new Promise((r) => setTimeout(r, 1500));
      process.exit(0);
    }
    console.error(chalk.red(err));
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await removeAppFolder();
  await clearConsole();
  process.exit(0);
});

main();
