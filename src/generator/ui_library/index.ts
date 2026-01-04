import { extractMainMessage } from "../../utils/filter_error_message.js";
import { useContext } from "../../core/context/runtime.js";
import { UILibraryReact } from "./react/index.js";

export async function UILibrary() {
  const { user_options, operation_state } = useContext();

  try {
    if (user_options.js_framework.includes("React")) {
      await UILibraryReact();
    }

    operation_state.ui_library.status = "success";
  } catch (err: any) {
    operation_state.ui_library.status = "fatal";
    operation_state.ui_library.error_message = extractMainMessage(err);
  }
}
