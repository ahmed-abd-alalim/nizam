import { useContext } from "./context/runtime.js";
import { getRequiredPaths } from "../utils/get_required_paths.js";
import {
  CreatFolder,
  CreatVSCFolder,
  JSFramework,
  // CSSFramework,
  // ReactRouter,
} from "../generator/index.js";

export async function installProject() {
  const ctx = useContext();

  // get all path that's i will use
  getRequiredPaths();

  // creat folder operation
  await CreatFolder();
  if (ctx.operation_state.creat_project_folder.status === "fatal") {
    process.exit(0);
  }

  // JS Framework operation
  await JSFramework();
  if (ctx.operation_state.js_framework.status === "fatal") {
    process.exit(0);
  }

  // creact .vscode folder
  await CreatVSCFolder();

  // 4- clean new app

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
