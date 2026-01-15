import pathBox from "../../../assets/path/path_react.js";
import resources_json from "../../../assets/storage/resources.json" with { type: "json" };
import { UsingMark } from "../../../utils/using_mark.js";
import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import { readFile, appendFile } from "../../../utils/fs.js";
import { useContext } from "../../../core/context/runtime.js";
import type { resources_type } from "../../../assets/type.js";

export async function Foundation() {
  const { user_options } = useContext();
  const path_box = pathBox();
  const { css_framework }: resources_type = resources_json;

  const main_file_data = [
    {
      tage_name: "foundation_min",
      content: `import 'foundation-sites/dist/css/foundation.min.css';`,
    },
  ];

  await UsingMark(path_box.main_react_path, main_file_data);

  // edit index.css
  const css_text = await readFile(path_box.bootstrap_templates, "utf8");
  await appendFile(path_box.index_css_path, css_text);

  await nizamDocEditor({
    title_params: user_options.CSS_framework,
    expla_params: `
We have created a clear and ready made structure that you can use. you will find it inside \`index.css\` file.

> [!TIP]
> Foundation Documentation: [${css_framework.documentation.foundation.des}](${css_framework.documentation.foundation.link})`,
  });
}
