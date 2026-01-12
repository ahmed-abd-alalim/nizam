import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/config.json" with { type: 'json' };
import pathBox from "../../../assets/path/path_react.js";
import { useContext } from "../../../core/context/runtime.js";
import { ensureFile, readFile, writeFile, mkdir } from "../../../utils/fs.js";
import { UsingMark } from "../../../utils/using_mark.js";

export async function ReduxToolkit() {
  const { user_options } = useContext();
  const appData = Data;
  const path_box = pathBox();
  const main_file_data = [
    {
      tage_name: "import_react_toolkit_provider",
      content: `import { Provider } from "react-redux";`,
    },
    {
      tage_name: "import_react_toolkit_store",
      content: `import { store } from "${
        user_options.add_aliase ? "@" : "."
      }/store/store";`,
    },
    {
      tage_name: "open_tage_react_toolkit_provider",
      content: `<Provider store={store}>`,
    },
    {
      tage_name: "close_tage_react_toolkit_provider",
      content: `</Provider>`,
    },
  ];

  const ensure_read_write = async (
    file_path: string,
    temp_path: string
  ): Promise<void> => {
    const file_contant = await readFile(temp_path);
    await ensureFile(file_path);
    await writeFile(file_path, file_contant, "utf8");
  };

  await mkdir(path_box.store_path, { recursive: true });
  await mkdir(path_box.store_slices_path, { recursive: true });
  await ensure_read_write(
    path_box.store_file_path,
    path_box.store_file_template
  );
  await ensure_read_write(
    path_box.slices_counter_file_path,
    path_box.slices_counter_file_template
  );
  await ensure_read_write(
    path_box.slices_index_file_path,
    path_box.slices_index_file_template
  );

  await UsingMark(path_box.main_react_path, main_file_data);

  await nizamDocEditor({
    title_params: user_options.state_management,
    expla_params: `
#### We've created a template that you can use or modify. You'll find it inside. \`src/store\`.

Its structure:
\`\`\`
src/
├─ store/
│  ├─ slices/
│  │  ├─ index.${user_options.js_framework.includes("js") ? "js" : "ts"}
│  │  └─ counterSlice.${
    user_options.js_framework.includes("js") ? "js" : "ts"
  }
│  └─ store.${user_options.js_framework.includes("js") ? "js" : "ts"}
  \`\`\`
  
> [!TIP]
> Redux Toolkit Documentation: [${
    appData.pkg_documentation.state_management.redux_toolkit.des
  }](${appData.pkg_documentation.state_management.redux_toolkit.link})`,
  });
}
