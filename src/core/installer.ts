import path from "path";
import type {
  user_options_type,
  operation_state_type,
} from "../assets/type.js";
import { operations } from "../prompts/operations.js";
import {
  CreatFolder,
  JSFramework,
  // CSSFramework,
  // ReactRouter,
} from "../generator/index.js";

export async function installProject(params: user_options_type) {
  let operation_state: operation_state_type;
  const operation_list = { ...params };
  const project_Path = path.resolve(process.cwd(), operation_list.project_path);
  const project_full_Path = `${project_Path}\\${operation_list.project_name}`;

  // creat folder operation
  operation_state = await CreatFolder(project_full_Path);
  await operations("Creat Folder", operation_state);
  if (operation_state.status === "fatal") {
    process.exit(0);
  }

  // JS Framework operation
  operation_state = await JSFramework(
    project_full_Path,
    operation_list.js_framework
  );

  await operations("JS Framework", operation_state);
  if (operation_state.status === "fatal") {
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
