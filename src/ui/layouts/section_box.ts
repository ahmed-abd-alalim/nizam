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
  // const empty_line =
  //   " ".repeat(spaceEachSide) + " ".repeat(totalLength - spaceEachSide - 1);

  console.log(chalk.yellowBright(`✦ `) + chalk.bold.green(`${sideHashes}╮`));
  // console.log(chalk.green(`¦ ${empty_line} ¦`));
  console.log(
    `${chalk.green(`¦ `)}${chalk.yellowBright.bold(line)}${chalk.green(`  ¦`)}`,
  );
  // console.log(chalk.green(`¦ ${empty_line} ¦`));
  console.log(chalk.bold.green(`╰${sideHashes}`) + chalk.yellowBright(` ✦`));
  console.log(chalk.yellowBright.bold(`↓`));
}
