import type { operation_state_type } from "../assets/type.js";
import { ensureDir } from "../utils/fs.js";
import { extractMainMessage } from "../utils/filter_error_message.js";

export async function CreatFolder(
  params: string
): Promise<operation_state_type> {
  const operation_state = { status: "", error_message: "" };

  try {
    await ensureDir(params);
    operation_state.status = "success";
  } catch (err: any) {
    operation_state.status = "fatal";
    operation_state.error_message = extractMainMessage(err);
  }
  return operation_state;
}
