import { ensureDir } from "../utils/fs.js";
import { extractMainMessage } from "../utils/filter_error_message.js";
import { useContext } from "../core/context/runtime.js";

export async function CreatFolder() {
  const ctx = useContext();

  try {
    await ensureDir(ctx.full_project_path);
    ctx.operation_state.creat_project_folder.status = "success";
  } catch (err: any) {
    ctx.operation_state.creat_project_folder.status = "fatal";
    ctx.operation_state.creat_project_folder.error_message =
      extractMainMessage(err);
  }
}
