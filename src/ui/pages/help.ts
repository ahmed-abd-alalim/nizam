import chalk from "chalk";
import { input } from "@inquirer/prompts";
import resources_json from "../../assets/storage/resources.json" with { type: "json" };
import type { resources_type } from "../../assets/type.js";

export async function help() {
  const resource: resources_type = resources_json;
  const app_data_value = Object.values(resource);
  let back = false;

  console.log(
    `${chalk.yellowBright("[")}${chalk.redBright("#")}${chalk.yellowBright(
      "]== Explanation of all questions and their options in OneShot Mode:",
    )}`,
  );
  console.log(chalk.yellowBright("|"));
  for (const [i, section] of app_data_value.entries()) {
    console.log(
      chalk.yellowBright(
        `[${chalk.redBright(i)}]==========[ ${chalk.redBright(
          section.name,
        )} ]==========`,
      ),
    );
    console.log(chalk.yellowBright("|"));
    console.log(
      `${chalk.yellowBright(
        `|=(${chalk.gray("options")})=>`,
      )} ${chalk.greenBright(
        section.options
          .map(
            (opt: { name: string; value: string }, i: number) =>
              `${opt.name}${
                i + 1 === section.options.length ? "" : chalk.yellowBright(",")
              }`,
          )
          .join(" "),
      )}`,
    );
    console.log(chalk.yellowBright("|"));
    console.log(
      `${chalk.yellowBright(
        `|=(${chalk.gray("description")})=>`,
      )} ${chalk.yellowBright(section.description)}\n`,
    );
  }

  while (!back) {
    await input({
      message: `\n[${chalk.redBright("!")}] Press the ${chalk.bgRedBright(
        "Enter key",
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
