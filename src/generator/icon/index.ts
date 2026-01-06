import { extractMainMessage } from "../../utils/filter_error_message.js";
import { useContext } from "../../core/context/runtime.js";
import { IconLibraryReact } from "./react/index.js";

export async function IconLibrary() {
  const { user_options, operation_state } = useContext();

  try {
    if (user_options.js_framework.includes("React")) {
      await IconLibraryReact();
    }

    operation_state.icon_library.status = "success";
  } catch (err: any) {
    operation_state.icon_library.status = "fatal";
    operation_state.icon_library.error_message = extractMainMessage(err);
  }
}
