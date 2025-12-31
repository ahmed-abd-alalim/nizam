#!/usr/bin/env node

import {
  sectionBox,
  intro,
  exit,
  Core,
  Custom,
  help,
  HomeMenu,
  Search,
} from "../ui/index.js";
import os from "os";
import chalk from "chalk";
import { installProject } from "../core/installer.js";
import { createContext } from "../core/context/create.js";
import { startProject } from "../core/context/runtime.js";

async function main() {
  // create Context
  const ctx = createContext();
  startProject(ctx);

  try {
    // start nizam
    await intro();

    while (true) {
      // take action on what come from user option
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

          sectionBox("Maker");
          await installProject();
          process.exit(0);

        case "Custom Mode":
          console.clear();
          sectionBox("Custom Mode");
          await Core();
          await Custom();
          console.clear();

          sectionBox("Maker");
          await installProject();
          process.exit(0);

        case "Help":
          console.clear();
          sectionBox("Help");
          await help();
          break;
        case "Exit":
          console.clear();
          await exit(
            `See you soon... ${
              os.userInfo().username ? os.userInfo().username : "pop"
            }`
          );
      }
    }
  } catch (err: any) {
    if (err.name === "ExitPromptError") {
      await exit(
        `C+c Really!! Are you serious ${
          os.userInfo().username ? os.userInfo().username : "pop"
        } !! Do you really mean that!!!`
      );
    }
    console.error(chalk.red(err));
    process.exit(1);
  }
}

main();
