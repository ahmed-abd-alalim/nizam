import { ensureDir } from "../../utils/fs.js";
import { extractMainMessage } from "../../utils/filter_error_message.js";
import { useContext } from "../../core/context/runtime.js";

export async function CreatFolder() {
  const { operation_state, full_project_path } = useContext();

  try {
    await ensureDir(full_project_path);
    operation_state.creat_project_folder.status = "success";
  } catch (err: any) {
    operation_state.creat_project_folder.status = "fatal";
    operation_state.creat_project_folder.error_message =
      extractMainMessage(err);
  }
}
