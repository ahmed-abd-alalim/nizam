import { useContext } from "../../core/context/runtime.js";
import { input } from "@inquirer/prompts";
import chalk from "chalk";
import stripAnsi from "strip-ansi";

export async function printMenu() {
  const title = "YOUR SELECTED OPTIONS";
  const { user_options } = useContext();

  const rows = Object.entries(user_options)
    .filter(
      ([, value]) =>
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value.length !== 0,
    )
    .map(([key, value]) => {
      let normalizedValue: string;
      if (value === true) normalizedValue = "yes";
      else if (value === false) normalizedValue = "no";
      else normalizedValue = String(value);
      const cleanKey = key
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => {
          if (word.length < 4) {
            return word.toUpperCase();
          } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
        })
        .join(" ");

      return {
        raw: ` ${cleanKey} : ${normalizedValue}`,
        colored: ` ${chalk.redBright(cleanKey)} : ${chalk.greenBright(
          normalizedValue,
        )}`,
      };
    });

  const allLines = [title, ...rows.map((r) => r.raw)];

  const width = Math.max(
    ...allLines.map((l) => l.length + (rows.length > 9 ? 9 : 8)),
  );
  const line = "═".repeat(width);
  const line2 = "-".repeat(width);

  console.log(chalk.yellowBright(`╔${line}╗`));
  console.log(
    `${chalk.yellowBright("║")}${chalk.redBright(
      title.padStart((width + title.length) / 2).padEnd(width),
    )}${chalk.yellowBright("║")}`,
  );
  console.log(chalk.yellowBright(`╠${line}╣`));

  rows.forEach((row, i) => {
    const padding = width - stripAnsi(row.raw).length;
    console.log(
      `${chalk.yellowBright("║")}${chalk.yellowBright("[")}${chalk.redBright(
        i + 1,
      )}${chalk.yellowBright("]")} ${
        row.colored + " ".repeat(padding - (i + 1 > 9 ? 5 : 4))
      }${chalk.yellowBright("║")}`,
    );
    if (rows.length - 1 === i) return;
    console.log(chalk.yellowBright(`╠${line2}╣`));
  });

  console.log(chalk.yellowBright(`╚${line}╝`));

  await input({
    message: `${chalk.yellowBright("\n[!] Press the Enter key to continue.")}`,
    theme: {
      prefix: {
        idle: ``,
        done: ``,
      },
    },
  });
  process.stdout.write("\x1b[1A\x1b[2K");
}
