import { readFile, appendFile } from "../../../utils/fs.js";
import { UsingMark } from "../../../utils/using_mark.js";
import PathBox from "../../../assets/path/path_react.js";
import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import { useContext } from "../../../core/context/runtime.js";
import Data from "../../../assets/config.json" with { type: 'json' };

export async function Tailwind() {
  const { user_options } = useContext();
  const path_box = PathBox();
  const appData: any = Data;
  const vite_config_data = [
    {
      tage_name: "import_tailwindcss",
      content: `import tailwindcss from '@tailwindcss/vite'`,
    },
    {
      tage_name: "append_tailwindcss_plugins",
      content: `tailwindcss(),`,
    },
  ];
  const index_css_data = [
    {
      tage_name: "import_tailwindcss",
      content: `@import "tailwindcss";`,
    },
  ];

  try {
    await UsingMark(path_box.vite_config_path, vite_config_data);
    await UsingMark(path_box.index_css_path, index_css_data);

    // edit index.css
    const tailwind_text = await readFile(path_box.tailwind_templates, "utf8");
    await appendFile(path_box.index_css_path, tailwind_text);

    await nizamDocEditor({
      title_params: user_options.CSS_framework,
      expla_params: `
We have created a clear and ready made structure that you can use. you will find it inside \`index.css\` file.

> [!TIP]
> Tailwindcss Documentation: [${appData.pkg_documentation.css_framework.tailwindcss.des}](${appData.pkg_documentation.css_framework.tailwindcss.link})`,
    });
  } catch (err: any) {
    throw err;
  }
}
