import { useContext } from "../../core/context/runtime.js";
import { mkdir, writeFile } from "../../utils/fs.js";
import pathBox from "../../assets/path/path_react.js";
import path from "path";

export async function structureReact() {
  const { user_options } = useContext();
  const path_box = pathBox();
  const app_structure = user_options.app_structure;
  const folder_structure_array = user_options.folder_structure_names;
  const files_structure_array = user_options.files_structure_names;
  const files_structure_array_with_some_from_user_options = [
    ...files_structure_array,
    `${user_options.js_framework.includes("ts") ? "type.ts" : ""}`,
  ];

  const all_folder_structure_names = [
    "layouts",
    "components",
    "utils",
    "storage",
  ];

  const all_file_structure_names = [
    `${user_options.js_framework.includes("ts") ? "type.ts" : ""}`,
    "config.json",
    "api.json",
    "routing.json",
    "icon.j/ts",
  ];

  const creat_folder_fun = async (folder_name: string) => {
    const new_folder_path = path.resolve(path_box.src_path, folder_name);
    const index_file_Path = path.join(
      new_folder_path,
      `index.${user_options.js_framework.includes("js") ? "js" : "ts"}`
    );
    try {
      await mkdir(new_folder_path, { recursive: true });
      await writeFile(index_file_Path, "", "utf8");
    } catch (err) {
      throw err;
    }
  };

  const creat_file_fun = async ({
    file_name,
    index_folder = "assets",
  }: {
    file_name: string;
    index_folder?: string;
  }) => {
    const index_folder_path = path.resolve(path_box.src_path, index_folder);
    const [f_name, f_type] = file_name.split(".");
    const file_Path = path.join(
      index_folder_path,
      `${f_name}.${
        f_type.includes("j/ts")
          ? user_options.js_framework.includes("js")
            ? "js"
            : "ts"
          : f_type
      }`
    );
    try {
      await writeFile(
        file_Path,
        `${f_type.includes("json") ? JSON.stringify({}) : ""}`,
        "utf8"
      );
    } catch (err) {
      throw err;
    }
  };

  try {
    if (app_structure.includes("nizam method")) {
      // make folders
      for (let folder_name of all_folder_structure_names) {
        if (!folder_name) continue;
        await creat_folder_fun(folder_name);
      }

      // make files
      for (let file_name of all_file_structure_names) {
        if (!file_name) continue;
        await creat_file_fun({ file_name });
      }
    } else if (app_structure.includes("custom method")) {
      // make folders
      for (let folder_name of folder_structure_array) {
        if (!folder_name) continue;
        await creat_folder_fun(folder_name);
      }

      // make files
      for (let file_name of files_structure_array_with_some_from_user_options) {
        if (!file_name) continue;
        await creat_file_fun({ file_name });
      }
    }
  } catch (err) {
    throw err;
  }
}
