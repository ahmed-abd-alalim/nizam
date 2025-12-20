#!/usr/bin/env node

import {
  intro,
  sectionBox,
  start,
  getPrompts,
  help,
  exit,
} from "../ui/index.js";
import os from "os";
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
      await start();
      switch (ctx.start_menu_options) {
        case "Start":
          console.clear();
          sectionBox("Start");
          await getPrompts();
          await installProject();
          await exit(
            `We hope you achieved what you wanted. Goodbye ${
              os.userInfo().username
            }.`
          );
        case "Help":
          console.clear();
          sectionBox("Help");
          await help();
          break;
        case "Exit":
          console.clear();
          await exit(`See you soon... ${os.userInfo().username}`);
      }
    }
  } catch (err: any) {
    if (err.name === "ExitPromptError") {
      await exit(
        `C+c Really!! Are you serious ${
          os.userInfo().username
        } !! Do you really mean that!!!`
      );
    }
    console.error(err);
    process.exit(1);
  }
}

main();
