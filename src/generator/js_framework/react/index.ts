import { customInstall } from "../../../utils/pkg/index.js";
import { useContext } from "../../../core/context/runtime.js";
import appData from "../../../assets/config.json" with { type: 'json' };
import { ReactFiles } from "./react_files.js";

export async function React() {
  const { user_options } = useContext();
  let pkg = "npx";

  if (user_options.js_framework.includes("js")) {
    await customInstall(
      pkg,
      appData.pkg_terminal_command.js_framework.react.js
    );
  } else if (user_options.js_framework.includes("ts")) {
    await customInstall(
      pkg,
      appData.pkg_terminal_command.js_framework.react.ts
    );
  }

  await ReactFiles();
}
