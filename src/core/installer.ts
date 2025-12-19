import path from "path";
import { useContext } from "./context/runtime.js";
import {
  CreatFolder,
  JSFramework,
  // CSSFramework,
  // ReactRouter,
} from "../generator/index.js";

export async function installProject() {
  const ctx = useContext();
  const operation_list = ctx.user_options;

  const project_Path = path.resolve(process.cwd(), operation_list.project_path);
  ctx.full_project_path = `${project_Path}\\${operation_list.project_name}`;

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

  // 3- npm  or  yarn   ###and edit in js-fram-> install

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
