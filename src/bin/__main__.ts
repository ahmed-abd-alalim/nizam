#!/usr/bin/env node

import { start, getPrompts, help, exit } from "../prompts/index.js";
import { installProject } from "../core/installer.js";

async function main() {
  try {
    // start Bango
    console.clear();
    const option = await start();

    // take action on what come from user option
    if (option === "Start") {
      const user_options = await getPrompts();
      await installProject(user_options);
    } else if (option === "Help") {
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
