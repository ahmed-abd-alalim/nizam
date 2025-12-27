import { useContext } from "../../core/context/runtime.js";
import { extractMainMessage } from "../../utils/filter_error_message.js";
import { AliaseReact } from "./aliase_react.js";

export async function Aliase() {
  const { user_options, operation_state } = useContext();

  try {
    if (user_options.js_framework.includes("React")) {
      await AliaseReact();
    }

    operation_state.add_aliase.status = "success";
  } catch (err: any) {
    operation_state.add_aliase.status = "fatal";
    operation_state.add_aliase.error_message = extractMainMessage(err);
  }
}
