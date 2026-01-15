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
} from "../ui/index.js";
import { execSync } from "child_process";
import chalk from "chalk";
import { Setup } from "../core/setup.js";
import { createContext } from "../core/context/create.js";
import { startProject } from "../core/context/runtime.js";
import { say } from "../ui/index.js";

async function main() {
  const ctx = createContext();
  startProject(ctx);

  const clearConsole = () => {
    if (process.platform === "win32") {
      execSync("cls", { stdio: "inherit" });
    } else {
      execSync("clear", { stdio: "inherit" });
    }
  };

  const search_mode_colle = async () => {
    clearConsole();
    sectionBox("Browse Mode");
    await Search();
    await Core();
    clearConsole();

    await printMenu();
    await Setup();
    await askAboutInstall();
  };

  const custom_mode_colle = async () => {
    clearConsole();
    sectionBox("OneShot Mode");
    await Core();
    await Custom();
    clearConsole();

    await printMenu();
    await Setup();
    await askAboutInstall();
  };

  const help_colle = async () => {
    clearConsole();
    sectionBox("Help");
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
      sectionBox("Home");
      await HomeMenu();
      switch (ctx.start_menu_options) {
        case "Browse Mode":
          await search_mode_colle();
          return;
        case "OneShot Mode":
          await custom_mode_colle();
          return;
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

main();
