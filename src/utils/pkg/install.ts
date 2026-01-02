import { execa } from "execa";
import { useContext } from "../../core/context/runtime.js";
import { extractMainMessage } from "../../utils/filter_error_message.js";

export async function install() {
  const { full_project_path, user_options, operation_state } = useContext();
  try {
    await execa(user_options.pkg_manager, ["install"], {
      cwd: full_project_path,
      stdio: "ignore",
      timeout: 60000,
      killSignal: "SIGTERM",
    });
    operation_state.install_all_packages.status = "success";
  } catch (err: any) {
    operation_state.install_all_packages.status = "fatal";
    operation_state.install_all_packages.error_message =
      extractMainMessage(err);
  }
}
