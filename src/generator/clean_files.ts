import { extractMainMessage } from "../utils/filter_error_message.js";
// import { installDeps,install } from "../utils/npm.js";
import { useContext } from "../core/context/runtime.js";

export async function CleanFiles() {
  const { full_project_path, operation_state } = useContext();

  try {
    // clean README.md file
    // make public folder empaty
    // make src/assets folder empaty
    // delet app.css
    // clean index.css
    // copy new app.jsx file

    operation_state.clean_app.status = "success";
  } catch (err: any) {
    operation_state.clean_app.status = "fatal";
    operation_state.clean_app.error_message = extractMainMessage(err);
  }
}
