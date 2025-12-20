import chalk from "chalk";

export function sectionBox(section_name: string) {
  const padding = 2;
  const totalLength = Math.max(section_name.length + padding * 2, 20);
  const sideHashes = "=".repeat(totalLength);

  // calculate spaces to center the text
  const spaceEachSide = Math.floor((totalLength - section_name.length) / 2);
  const line =
    " ".repeat(spaceEachSide) +
    section_name +
    " ".repeat(totalLength - section_name.length - spaceEachSide - 2);

  console.log(chalk.bold.green(sideHashes));
  console.log(chalk.yellowBright.bold(line));
  console.log(`${chalk.bold.green(sideHashes)}\n`);
}
