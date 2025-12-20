import { useContext } from "./context/runtime.js";
import { getRequiredPaths } from "../utils/get_required_paths.js";
import {
  CreatFolder,
  CreatVSCFolder,
  JSFramework,
  CleanFiles,
  // CSSFramework,
  // ReactRouter,
} from "../generator/index.js";

export async function installProject() {
  const { operation_state, user_options } = useContext();

  // get all path that's i will use
  getRequiredPaths();

  // creat folder operation
  await CreatFolder();
  if (operation_state.creat_project_folder.status === "fatal") {
    process.exit(0);
  }

  // JS Framework operation
  await JSFramework();
  if (operation_state.js_framework.status === "fatal") {
    process.exit(0);
  }

  // creact .vscode folder
  await CreatVSCFolder();

  // clean new app
  if (user_options.clean_app) {
    await CleanFiles();
  }

  // 4- add start default folder

  // 5- add aliase @

  // 6- operation_state.push([
  //   "CSS Framework",
  //   CSSFramework(operation_list.CSS_framework),
  // ]);

  // 7- operation_state.push([
  //   "React Router",
  //   ReactRouter(operation_list.react_router),
  // ]);

  // operations(Object.fromEntries(operation_state));
}
