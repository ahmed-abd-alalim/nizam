import { execa } from "execa";
import { useContext } from "../../core/context/runtime.js";
import { extractMainMessage } from "../../utils/filter_error_message.js";

export async function install() {
  const { full_project_path, user_options, operation_state } = useContext();

  try {
    await execa(user_options.pkg_manager, ["install"], {
      cwd: full_project_path,
      timeout: 600000,
    });

    operation_state.install_all_packages.status = "success";
  } catch (e: any) {
    if (e.timedOut) {
      operation_state.install_all_packages.status = "fatal";
      operation_state.install_all_packages.error_message = `⏱ Timeout, Check your internet connection and Take a look at the NIZAM_DOC.md file to learn how to continue the download.`;
    } else {
      operation_state.install_all_packages.status = "fatal";
      operation_state.install_all_packages.error_message =
        extractMainMessage(e);
    }
  }
}
