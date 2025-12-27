import { React } from "./react/index.js";
import { useContext } from "../../core/context/runtime.js";
import { extractMainMessage } from "../../utils/filter_error_message.js";

export async function JSFramework() {
  const { user_options, operation_state } = useContext();

  try {
    if (user_options.js_framework.includes("React")) {
      await React();
    }
    operation_state.js_framework.status = "success";
  } catch (err: any) {
    operation_state.js_framework.status = "fatal";
    operation_state.js_framework.error_message = extractMainMessage(err);
  }
}
