import { useContext } from "./context/runtime.js";
import { CorePaths } from "../assets/path/core.js";
import { operations } from "../ui/index.js";
import { operation_state_type } from "../assets/type.js";
import {
  CreatFolder,
  CreatVSCFolder,
  Aliase,
  Structure,
  JSFramework,
  CSSFramework,
  UILibrary,
  IconLibrary,
} from "../generator/index.js";

export async function Setup() {
  const { operation_state, user_options } = useContext();
  const operation_data = [
    {
      operation_name: "creat_project_folder",
      operation_fun: CreatFolder,
      operation_des: "creat project folder",
      operation_is_need: true,
      operation_targit: true,
    },
    {
      operation_name: "js_framework",
      operation_fun: JSFramework,
      operation_des: `install ${user_options.js_framework}`,
      operation_is_need: true,
      operation_targit: user_options.js_framework,
    },
    {
      operation_name: "creat_vsc_folder",
      operation_fun: CreatVSCFolder,
      operation_des: "creat .vscode folder",
      operation_is_need: false,
      operation_targit: true,
    },
    {
      operation_name: "add_aliase",
      operation_fun: Aliase,
      operation_des: "make aliase @",
      operation_is_need: false,
      operation_targit: user_options.add_aliase,
    },
    {
      operation_name: "app_structure",
      operation_fun: Structure,
      operation_des: "build app structure",
      operation_is_need: false,
      operation_targit: user_options.app_structure,
    },
    {
      operation_name: "CSS_framework",
      operation_fun: CSSFramework,
      operation_des: `install ${user_options.CSS_framework}`,
      operation_is_need: false,
      operation_targit: user_options.CSS_framework,
    },
    {
      operation_name: "ui_library",
      operation_fun: UILibrary,
      operation_des: `install UI Component Library`,
      operation_is_need: false,
      operation_targit: user_options.ui_library,
    },
    {
      operation_name: "icon_library",
      operation_fun: IconLibrary,
      operation_des: `install icons Library`,
      operation_is_need: false,
      operation_targit: user_options.icon_library,
    },
  ];

  // get all path that's i will use
  CorePaths();

  for (const _ of operation_data) {
    if (!_.operation_targit) continue;
    await operations(_.operation_fun, _.operation_name, _.operation_des);
    if (!_.operation_is_need) continue;
    if (
      operation_state[_.operation_name as keyof operation_state_type].status ===
      "fatal"
    ) {
      process.exit(0);
    }
  }

  //@@@ clean all tage i all file after finished

  // ##-nizam@mark-##: name of section

  // 5- add aliase @

  // 4- add start default (folder struchers) folders

  // 7- operation_state.push([
  //   "React Router",
  //   ReactRouter(operation_list.react_router),
  // ]);
}
