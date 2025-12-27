import { installDeps, install } from "../../../utils/npm.js";
import { useContext } from "../../../core/context/runtime.js";
import appData from "../../../assets/config.json" with { type: 'json' };
import { ReactFiles } from "./react_files.js";

export async function React() {
  const { user_options } = useContext();
  let pkg = "npx";

  try {
    if (user_options.js_framework.includes("js")) {
      await installDeps(pkg, [
        appData.pkg_terminal_command.js_framework.react.js,
      ]);
    } else if (user_options.js_framework.includes("ts")) {
      await installDeps(pkg, [
        appData.pkg_terminal_command.js_framework.react.ts,
      ]);
    }

    //  await install()

    await ReactFiles();
  } catch (err: any) {
    throw err;
  }
}
