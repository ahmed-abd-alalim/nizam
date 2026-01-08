import path from "path";
import { useContext } from "../../core/context/runtime.js";
import { mkdir, writeFile } from "../../utils/fs.js";
import pathBox from "../../assets/path/path_react.js";
import { nizamDocEditor } from "../../utils/nizam_doc_editor.js";
import appData from "../../assets/config.json" with { type: 'json' };

export async function structureReact() {
  const { user_options } = useContext();
  const path_box = pathBox();
  const app_structure = user_options.app_structure;
  const folder_structure_array = user_options.folder_structure_names;
  const files_structure_array = user_options.files_structure_names;
  const files_structure_array_with_some_from_user_options = [
    ...files_structure_array,
    user_options.js_framework.includes("ts") ? "type.ts" : null,
  ];

  const all_folder_structure_names = [
    "layouts",
    "components",
    "utils",
    "storage",
  ];

  const all_file_structure_names = [
    user_options.js_framework.includes("ts") ? "type.ts" : null,
    "config.json",
    "api.json",
    !user_options.routing_library ? null : "routing.json",
    !user_options.icon_library.length ? null : "icons.j/ts",
  ];

  const creat_folder_fun = async (folder_name: string) => {
    const new_folder_path = path.resolve(path_box.src_path, folder_name);
    const index_file_Path = path.join(
      new_folder_path,
      `index.${user_options.js_framework.includes("js") ? "js" : "ts"}`
    );

    await mkdir(new_folder_path, { recursive: true });
    await writeFile(index_file_Path, "", "utf8");
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

    await writeFile(
      file_Path,
      `${f_type.includes("json") ? JSON.stringify({}) : ""}`,
      "utf8"
    );
  };

  if (app_structure.includes("nizam method")) {
    // make folders
    for (let folder_name of all_folder_structure_names.filter(
      Boolean
    ) as string[]) {
      await creat_folder_fun(folder_name);
    }

    // make files
    for (let file_name of all_file_structure_names.filter(
      Boolean
    ) as string[]) {
      await creat_file_fun({ file_name });
    }
  } else if (app_structure.includes("custom method")) {
    // make folders
    for (let folder_name of folder_structure_array.filter(
      Boolean
    ) as string[]) {
      await creat_folder_fun(folder_name);
    }

    // make files
    for (let file_name of files_structure_array_with_some_from_user_options.filter(
      Boolean
    ) as string[]) {
      await creat_file_fun({ file_name });
    }
  }

  await nizamDocEditor({
    title_params: "React App Structure",
    dec_params: `Creating a barrel file \`index.${
      user_options.js_framework.includes("js") ? "js" : "ts"
    }\` inside a folder allows you to re-export everything in that folder, and then when importing out, you only need to import from the same folder.`,
    expla_params: `
Example of a folder structure
\`\`\`
components/
├─ Button.${user_options.js_framework.includes("js") ? "js" : "ts"}x
├─ Card.${user_options.js_framework.includes("js") ? "js" : "ts"}x
├─ Modal.${user_options.js_framework.includes("js") ? "js" : "ts"}x
└─ index.${user_options.js_framework.includes("js") ? "js" : "ts"}
\`\`\`

Inside the \`index.${user_options.js_framework.includes("js") ? "js" : "ts"}\`
\`\`\`
// re-export all components
export { default as Button } from "./Button";
export { default as Card } from "./Card";
export { default as Modal } from "./Modal";
\`\`\`

When use it
\`\`\`
import { Button, Card, Modal } from "./components";

Button(); // use Button
Card();   // use Card
Modal();  // use Modal
\`\`\`
\`from "./components"\` We only write the folder name.

> [!TIP]
> React App Structure Documentation: [${
      appData.pkg_documentation.app_structure.react.des
    }](${appData.pkg_documentation.app_structure.react.link})`,
  });
}
