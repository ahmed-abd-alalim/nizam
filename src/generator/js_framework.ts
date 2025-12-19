import type { operation_state_type } from "../assets/type.js";
import { extractMainMessage } from "../utils/filter_error_message.js";
import { installDeps } from "../utils/npm.js";
import { execa } from "execa";

export async function JSFramework(
  path_params: string,
  name_params: string
): Promise<operation_state_type> {
  const operation_state = { status: "", error_message: "" };
  let pkg_command;
  let pkg = "npx";

  try {
    if (name_params.includes("js")) {
      pkg_command = [
        "degit",
        "vitejs/vite/packages/create-vite/template-react",
        path_params,
      ];
      await installDeps(pkg, pkg_command);
    } else {
      pkg_command = [
        "degit",
        "vitejs/vite/packages/create-vite/template-react-ts",
        path_params,
      ];
      await installDeps(pkg, pkg_command);
    }

    await execa("npm", ["install"], {
      cwd: path_params,
      stdio: "ignore",
    });

    operation_state.status = "success";
  } catch (err: any) {
    operation_state.status = "fatal";
    operation_state.error_message = extractMainMessage(err);
  }
  return operation_state;
}
