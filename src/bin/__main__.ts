#!/usr/bin/env node

import { intro, start, getPrompts, help, exit } from "../ui/index.js";
import { installProject } from "../core/installer.js";
import { createContext } from "../core/context/create.js";
import { startProject } from "../core/context/runtime.js";

async function main() {
  // create Context
  const ctx = createContext();
  startProject(ctx);

  try {
    // ?? check internet

    // start nizam
    console.clear();
    await intro();
    await start();

    // take action on what come from user option
    if (ctx.start_menu_options === "Start") {
      await getPrompts();
      await installProject();
    } else if (ctx.start_menu_options === "Help") {
      help();
    } else {
      exit();
    }
  } catch (err: any) {
    if (err.name === "ExitPromptError") {
      exit();
    }
    console.error(err);
    process.exit(1);
  }
}

main();
