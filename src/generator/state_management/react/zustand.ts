import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/config.json" with { type: 'json' };
import pathBox from "../../../assets/path/path_react.js";
import { useContext } from "../../../core/context/runtime.js";
import { ensureFile, readFile, writeFile, mkdir } from "../../../utils/fs.js";

export async function Zustand() {
  const { user_options } = useContext();
  const appData = Data;
  const path_box = pathBox();

  const ensure_read_write = async (
    file_path: string,
    temp_path: string
  ): Promise<void> => {
    const file_contant = await readFile(temp_path);
    await ensureFile(file_path);
    await writeFile(file_path, file_contant, "utf8");
  };

  await mkdir(path_box.store_path, { recursive: true });

  await ensure_read_write(
    path_box.zustand_use_counter_file_path,
    path_box.zustand_use_counter_file_template
  );
  await ensure_read_write(
    path_box.zustand_index_file_path,
    path_box.zustand_index_file_template
  );

  await nizamDocEditor({
    title_params: "Zustand",
    expla_params: `
#### We've created a template that you can use or modify. You'll find it inside. \`src/store\`.

Its structure:
\`\`\`
src/
├─ store/
│  ├─ useCounterStore.${user_options.js_framework.includes("js") ? "js" : "ts"} 
│  │
\`\`\`

> [!TIP]
> Zustand Documentation: [${
      appData.pkg_documentation.state_management.zustand.des
    }](${appData.pkg_documentation.state_management.zustand.link})`,
  });
}
