import { readFile, appendFile } from "../../../utils/fs.js";
import { UsingMark } from "../../../utils/using_mark.js";
import PathBox from "../../../assets/path/path_react.js";

export async function Tailwind() {
  const path_box = PathBox();

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
  } catch (err: any) {
    throw err;
  }
}
