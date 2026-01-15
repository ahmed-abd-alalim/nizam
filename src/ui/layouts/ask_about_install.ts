import { say, operations } from "../../ui/index.js";
import { install } from "../../utils/pkg/index.js";
import { confirm } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";
import { readFile, writeFile } from "../../utils/fs.js";
import pathBox from "../../assets/path/path_react.js";
export async function askAboutInstall() {
  const { user_options, operation_state } = useContext();
  const path_box = pathBox();
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

  const install_instructions = `
### install all package

#### Here’s the way, to install all packages

Run (Development mode)
\`\`\`bash
${user_options.pkg_manager} install
\`\`\`
  ---
`;

  if (user_options.pkg_manager.length !== 0) {
    const is_ok = await confirm({
      message: `Do you want install all packages now?`,
      default: false,
      theme: question_theme,
    });
    if (is_ok) {
      process.stdout.write("\x1b[1A\x1b[2K");
      await operations(
        install,
        "install_all_packages",
        "Install all packages ",
      );
    } else {
      const content = await readFile(path_box.nizam_Instructions_path, "utf8");
      const lines = content.split("\n");
      lines.splice(11, 0, install_instructions);
      await writeFile(
        path_box.nizam_Instructions_path,
        lines.join("\n"),
        "utf8",
      );
    }
  }

  if (operation_state.install_all_packages.status === "fatal") return;
  await new Promise((r) => setTimeout(r, 1500));
  await say(
    `Don't forget to take a look at the attached file ${chalk.bold(
      "NIZAM_DOC.md",
    )} within the new project to learn how to work with the downloaded packages.`,
  );
  await new Promise((r) => setTimeout(r, 4000));
}
