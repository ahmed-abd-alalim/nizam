import { extractMainMessage } from "../../utils/filter_error_message.js";
import { useContext } from "../../core/context/runtime.js";
import { DataFetchingReact } from "./react/index.js";

export async function DataFetching() {
  const { user_options, operation_state } = useContext();

  try {
    if (user_options.js_framework.includes("React")) {
      await DataFetchingReact();
    }

    operation_state.data_fetching.status = "success";
  } catch (err: any) {
    operation_state.data_fetching.status = "fatal";
    operation_state.data_fetching.error_message = extractMainMessage(err);
  }
}
