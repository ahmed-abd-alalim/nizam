import { customInstall } from "../../../utils/pkg/index.js";
import { useContext } from "../../../core/context/runtime.js";
import appData from "../../../assets/storage/resources.json" with { type: 'json' };
import { ReactFiles } from "./react_files.js";

export async function React() {
  const { user_options } = useContext();
  const { js_framework } = appData;
  let pkg = "npx";

  if (user_options.js_framework.includes("js")) {
    await customInstall(pkg, js_framework.terminal_command.react.js);
  } else if (user_options.js_framework.includes("ts")) {
    await customInstall(pkg, js_framework.terminal_command.react.ts);
  }

  await ReactFiles();
}
