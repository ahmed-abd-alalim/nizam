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
import chalk from "chalk";
import { Setup } from "../core/setup.js";
import { createContext } from "../core/context/create.js";
import { startProject } from "../core/context/runtime.js";
import { say } from "../ui/index.js";

async function main() {
  const ctx = createContext();
  startProject(ctx);

  try {
    await intro();

    while (true) {
      console.clear();
      sectionBox("Home Menu");
      await HomeMenu();

      switch (ctx.start_menu_options) {
        case "Search Mode":
          console.clear();
          sectionBox("Search Mode");
          await Search();
          await Core();
          console.clear();

          await printMenu();
          await Setup();
          await askAboutInstall();
          return;

        case "Custom Mode":
          console.clear();
          sectionBox("Custom Mode");
          await Core();
          await Custom();
          console.clear();

          await printMenu();
          await Setup();
          await askAboutInstall();
          return;

        case "Help":
          console.clear();
          sectionBox("Help");
          await help();
          break;
        case "Exit":
          console.clear();
          await say(`See you soon... `);
          await new Promise((r) => setTimeout(r, 1500));
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
