import { operations } from "../../ui/index.js";
import { install } from "../../utils/pkg/index.js";
import { confirm } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";

export async function askAboutInstall() {
  const { user_options } = useContext();

  const question_theme = {
    prefix: {
      idle: `${chalk.yellowBright("[")}${chalk.blueBright(
        "?",
      )}${chalk.yellowBright("]")}`,
      done: `${chalk.yellowBright("[")}${chalk.greenBright(
        "✔",
      )}${chalk.yellowBright("]")}`,
    },
    style: {
      message: (text: any) => chalk.blueBright(text),
      answer: (text: any) => chalk.greenBright(text),
    },
  };

  if (user_options.pkg_manager.length !== 0) {
    const is_ok = await confirm({
      message: `Do you want install all packages now?`,
      default: false,
      theme: question_theme,
    });

    if (is_ok) {
      process.stdout.write("\x1b[1A\x1b[2K");
      await operations(install, "install_all_packages", "Install all packages");
    }
  }
}
