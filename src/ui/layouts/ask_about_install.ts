import { say, operations } from "../../ui/index.js";
import { install } from "../../utils/pkg/index.js";
import { confirm } from "@inquirer/prompts";
import chalk from "chalk";
import { nizamDocEditor } from "../../utils/nizam_doc_editor.js";
import { useContext } from "../../core/context/runtime.js";

export async function askAboutInstall() {
  const { user_options, operation_state } = useContext();
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
      message: (text: any) => chalk.blueBright(text),
      answer: (text: any) => chalk.greenBright(text),
    },
  };

  const is_ok = await confirm({
    message: `Do you want install all packages now?`,
    default: false,
    theme: question_theme,
  });
  if (is_ok) {
    process.stdout.write("\x1b[1A\x1b[2K");
    await operations(install, "install_all_packages", "Install all packages ");
  } else
    await nizamDocEditor({
      title_params: "install all package",
      dec_params: "Here’s the way, to install all packages",
      expla_params: `
Run (Development mode)
\`\`\`bash 
${user_options.pkg_manager} install
\`\`\``,
    });

  if (operation_state.install_all_packages.status === "fatal") return;
  await new Promise((r) => setTimeout(r, 1000));
  await say(
    "Don't forget to take a look at the attached file NIZAM_DOC.md within the new project to learn how to work with the downloaded packages."
  );
}
