import PathBox from "../../assets/path/path_react.js";
import { useContext } from "../../core/context/runtime.js";
import chalk from "chalk";

export async function finalInstructure() {
  const { nizam_doc_html } = PathBox();
  const { operation_state, user_options } = useContext();

  await new Promise((r) => setTimeout(r, 500));

  if (
    operation_state.install_all_packages.status === "" ||
    operation_state.install_all_packages.status === "fatal"
  ) {
    console.log(
      `${chalk.yellowBright("[!] Download all packages using:")} ${chalk.greenBright(`${user_options.pkg_manager} install`)}`,
    );
  }

  console.log(
    `${chalk.yellowBright("[!] Get your doc (Open this path in your browser):")} ${chalk.greenBright(`file:///${nizam_doc_html}`)}\n`,
  );
}
