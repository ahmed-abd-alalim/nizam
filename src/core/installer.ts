import { useContext } from "./context/runtime.js";
import { getRequiredPaths } from "../utils/get_required_paths.js";
import { operations } from "../ui/operations.js";
import { operation_state_type } from "../assets/type.js";
import {
  CreatFolder,
  JSFramework,
  ReactFiles,
  CreatVSCFolder,
  // CSSFramework,
  // ReactRouter,
} from "../generator/index.js";

export async function installProject() {
  const { operation_state, user_options } = useContext();
  const operation_data = [
    {
      // check if folder pathe is orady found
      operation_name: "creat_project_folder",
      operation_fun: CreatFolder,
      operation_des: "creat project folder",
      operation_is_need: true,
      operation_targit: true,
    },
    {
      // enaple install pkg
      operation_name: "js_framework",
      operation_fun: JSFramework,
      operation_des: `download ${user_options.js_framework}`,
      operation_is_need: true,
      operation_targit: user_options.js_framework,
    },
    {
      operation_name: "clean_app",
      operation_fun: ReactFiles,
      operation_des: "clean app folder",
      operation_is_need: true,
      operation_targit: true,
    },
    {
      operation_name: "creat_vsc_folder",
      operation_fun: CreatVSCFolder,
      operation_des: "creat .vscode folder",
      operation_is_need: false,
      operation_targit: true,
    },
  ];

  // get all path that's i will use
  getRequiredPaths();

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

  // ##-nizam@mark-##: name of section

  // 5- add aliase @

  //3- ##### check what pkg name thats is inter is heer or now (npx - what input )

  // 4- add start default (folder struchers) folders

  // 6- operation_state.push([
  //   "CSS Framework",
  //   CSSFramework(operation_list.CSS_framework),
  // ]);

  // 7- operation_state.push([
  //   "React Router",
  //   ReactRouter(operation_list.react_router),
  // ]);
}
