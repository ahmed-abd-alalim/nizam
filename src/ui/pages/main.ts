import { input, rawlist, confirm, checkbox } from "@inquirer/prompts";
import chalk from "chalk";

const question_theme = {
  prefix: {
    idle: `${chalk.yellowBright("[")}${chalk.blueBright(
      "?"
    )}${chalk.yellowBright("]")}`,
    done: `${chalk.yellowBright("[")}${chalk.greenBright(
      "✔"
    )}${chalk.yellowBright("]")}`,
  },
  style: {
    message: (text: any) => chalk.blue(text),
    answer: (text: any) => chalk.greenBright(text),
  },
};
const checkbox_theme = {
  icon: {
    checked: ` ${chalk.greenBright("✔")} `,
    unchecked: ` ${chalk.redBright("✖")} `,
    pointer: "➤",
  },
  style: {
    message: (text: any) => chalk.blue(text),
    answer: (text: any) => chalk.greenBright(text),
    description: (text: any) => chalk.yellowBright(`[!] ${text}`),
    highlight: (text: any) => chalk.cyanBright(text),
  },
  prefix: {
    idle: `${chalk.yellowBright("[")}${chalk.blueBright(
      "?"
    )}${chalk.yellowBright("]")}`,
    done: `${chalk.yellowBright("[")}${chalk.greenBright(
      "✔"
    )}${chalk.yellowBright("]")}`,
  },
};

export async function fun_input(
  message: string,
  default_inbut: string,
  validate?: any
) {
  return await input({
    message: message,
    default: default_inbut,
    validate: validate,
    theme: question_theme,
  });
}

export async function rawlist_fun(
  message: string,
  choices: any
): Promise<string> {
  return await rawlist({
    message: message,
    choices: choices,
    theme: question_theme,
  });
}

export async function confirm_fun(message: string, default_value: boolean) {
  return await confirm({
    message: message,
    default: default_value,
    theme: question_theme,
  });
}

export async function checkbox_fun(
  message: string,
  choices: any,
  validate?: any
): Promise<string[]> {
  return await checkbox({
    message,
    choices: choices,
    validate: (value: any) => validate(value) ?? (() => true),
    theme: checkbox_theme,
  });
}

export async function check_is_Ok(qu_title: string) {
  return await confirm_fun(
    `Do you want use ${chalk.blueBright(qu_title)}?`,
    false
  );
}
