import { extractMainMessage } from "../utils/filter_error_message.js";
import { installDeps,install } from "../utils/npm.js";
import { useContext } from "../core/context/runtime.js";
import appData from "../assets/config.json" with { type: 'json' };;

export async function JSFramework() {
  const ctx = useContext();
  let pkg = "npx";

  try {
    if (ctx.user_options.js_framework.includes("js")) {
      await installDeps(pkg, [appData.pkg_terminal_command.js_framework.js]);
    } else {
      await installDeps(pkg, [appData.pkg_terminal_command.js_framework.ts]);
    }
    // install()
    ctx.operation_state.js_framework.status = "success";
  } catch (err: any) {
    ctx.operation_state.js_framework.status = "fatal";
    ctx.operation_state.js_framework.error_message = extractMainMessage(err);
  }
}
