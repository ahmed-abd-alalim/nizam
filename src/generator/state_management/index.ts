import { extractMainMessage } from "../../utils/filter_error_message.js";
import { useContext } from "../../core/context/runtime.js";
import { StateManagementReact } from "./react/index.js";

export async function StateManagement() {
  const { user_options, operation_state } = useContext();

  try {
    if (user_options.js_framework.includes("React")) {
      await StateManagementReact();
    }

    operation_state.state_management.status = "success";
  } catch (err: any) {
    operation_state.state_management.status = "fatal";
    operation_state.state_management.error_message = extractMainMessage(err);
  }
}
