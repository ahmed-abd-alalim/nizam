import { useContext } from "../core/context/runtime.js";
import { remove, pathExists } from "../utils/fs.js";

export async function removeAppFolder() {
  const { operation_state, user_options, full_project_path } = useContext();

  const is_start_build = !!user_options.project_name;
  const is_make_final_proses = !!Object.values(operation_state).at(-1).status;
  const is_path_found = async () => {
    return await pathExists(full_project_path);
  };

  if (is_start_build && !is_make_final_proses) {
    if (!(await is_path_found())) return;
    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (operation_state.js_framework.status !== "") {
          clearInterval(interval);
          resolve(operation_state.js_framework.status);
        }
      }, 50);
    });

    await remove(full_project_path);
  }
}
