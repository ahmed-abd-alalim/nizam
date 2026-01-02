import { useContext } from "../../core/context/runtime.js";
import { extractMainMessage } from "../../utils/filter_error_message.js";
import { structureReact } from "./structure_react.js";

export async function Structure() {
  const { user_options, operation_state } = useContext();

  try {
    if (user_options.js_framework.includes("React")) {
      await structureReact();
    }

    operation_state.app_structure.status = "success";
  } catch (err: any) {
    operation_state.app_structure.status = "fatal";
    operation_state.app_structure.error_message = extractMainMessage(err);
  }
}
