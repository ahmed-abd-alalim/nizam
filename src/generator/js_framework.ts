import { extractMainMessage } from "../utils/filter_error_message.js";
import { installDeps,install } from "../utils/npm.js";
import { useContext } from "../core/context/runtime.js";
import appData from "../assets/config.json" with { type: 'json' };

export async function JSFramework() {
  const {user_options, operation_state} = useContext();
  let pkg = "npx";

  try {
    if (user_options.js_framework.includes("js")) {
      await installDeps(pkg, [appData.pkg_terminal_command.js_framework.js]);
    } else {
      await installDeps(pkg, [appData.pkg_terminal_command.js_framework.ts]);
    }
    // install()
    operation_state.js_framework.status = "success";
  } catch (err: any) {
    operation_state.js_framework.status = "fatal";
    operation_state.js_framework.error_message = extractMainMessage(err);
  }
}
