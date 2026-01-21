import { extractMainMessage } from "../../utils/filter_error_message.js";
import { useContext } from "../../core/context/runtime.js";
import { CSSFrameworkReact } from "./react/index.js";

export async function CSSFramework() {
  const { user_options, operation_state } = useContext();

  try {
    if (user_options.js_framework.includes("React")) {
      await CSSFrameworkReact();
    }

    operation_state.css_framework.status = "success";
  } catch (err: any) {
    operation_state.css_framework.status = "fatal";
    operation_state.css_framework.error_message = extractMainMessage(err);
  }
}
