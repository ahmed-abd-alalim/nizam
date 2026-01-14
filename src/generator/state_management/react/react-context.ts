import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/storage/resources.json" with { type: 'json' };
import { mkdir, readFile, writeFile, ensureFile } from "../../../utils/fs.js";
import pathBox from "../../../assets/path/path_react.js";
import { UsingMark } from "../../../utils/using_mark.js";
import { useContext } from "../../../core/context/runtime.js";

export async function ReactContextAPI() {
  const { user_options } = useContext();
  const{ state_management } = Data;
  const path_box = pathBox();

  const main_file_data = [
    {
      tage_name: "context_import_theme_provider",
      content: `import { ThemeProvider } from "${
        user_options.add_aliase ? "@" : "."
      }/context/theme/ThemeProvider";`,
    },
    {
      tage_name: "open_tage_theme_provider",
      content: `<ThemeProvider>`,
    },
    {
      tage_name: "close_tage_theme_provider",
      content: `</ThemeProvider>`,
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

  await mkdir(path_box.context_path, { recursive: true });
  await mkdir(path_box.context_theme_path, { recursive: true });
  await ensure_read_write(
    path_box.theme_context_file_path,
    path_box.theme_context_file_template
  );
  await ensure_read_write(
    path_box.theme_provider_file_path,
    path_box.theme_provider_file_template
  );
  await ensure_read_write(
    path_box.use_theme_file_path,
    path_box.use_theme_file_template
  );

  await UsingMark(path_box.main_react_path, main_file_data);

  await nizamDocEditor({
    title_params: user_options.state_management,
    expla_params: `
#### We've created a template that you can use or modify. You'll find it inside. \`src/context/theme\`.

Its structure:
\`\`\`
src/
├─ context/
│  ├─ theme/
│  │  ├─ ThemeContext.${user_options.js_framework.includes("js") ? "js" : "ts"}
│  │  ├─ ThemeProvider.${
      user_options.js_framework.includes("js") ? "js" : "ts"
    }x
│  │  └─ useTheme.${user_options.js_framework.includes("js") ? "js" : "ts"}
\`\`\`

> [!TIP]
> React Context API Documentation: [${
      state_management.documentation.react_context_api.des
    }](${state_management.documentation.react_context_api.link})`,
  });
}
