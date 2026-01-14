import chalk from "chalk";
import { input } from "@inquirer/prompts";
import Data from "../../assets/storage/resources.json" with {type:"json"}

export async function help() {
  const app_data_value: any = Object.values(Data);
  let back = false;

  console.log(
    `${chalk.yellowBright("[")}${chalk.redBright("#")}${chalk.yellowBright(
      "]== Regarding all the options and what they include in the library:"
    )}`
  );
  console.log(chalk.yellowBright("|"));
  for (const [i, section] of app_data_value.entries()) {
    console.log(
      chalk.yellowBright(
        `[${chalk.redBright(i)}]==========[ ${chalk.redBright(
          section.name
        )} ]==========`
      )
    );
    console.log(chalk.yellowBright("|"));
    console.log(
      `${chalk.yellowBright(
        `|=(${chalk.gray("options")})=>`
      )} ${chalk.greenBright(
        section.options
          .map(
            (opt: { name: string; value: string }, i: number) =>
              `${opt.name}${
                i + 1 === section.options.length ? "" : chalk.yellowBright(",")
              }`
          )
          .join(" ")
      )}`
    );
    console.log(chalk.yellowBright("|"));
    console.log(
      `${chalk.yellowBright(
        `|=(${chalk.gray("description")})=>`
      )} ${chalk.yellowBright(section.description)}\n`
    );
  }

  while (!back) {
    await input({
      message: `\n[${chalk.redBright("!")}] Press the ${chalk.bgRedBright(
        "Enter key"
      )} to return to the home menu.`,
      theme: {
        prefix: {
          idle: ``,
          done: ``,
        },
      },
    });

    back = true;
  }
}
