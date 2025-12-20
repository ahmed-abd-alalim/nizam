import chalk from "chalk";

export function exit() {
  console.clear();
  console.log(chalk.redBright("Goodbye! 👋"));
  process.exit(0);
}
