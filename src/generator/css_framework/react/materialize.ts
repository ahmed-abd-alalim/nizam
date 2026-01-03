import pathBox from "../../../assets/path/path_react.js";
import Data from "../../../assets/config.json" with { type: 'json' };
import { UsingMark } from "../../../utils/using_mark.js";
import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import { readFile, appendFile } from "../../../utils/fs.js";
import { useContext } from "../../../core/context/runtime.js";

export async function Materialize() {
  const { user_options } = useContext();
  const path_box = pathBox();
  const appData = Data;

  const main_file_data = [
    {
      tage_name: "materialize_min",
      content: `import 'materialize-css/dist/css/materialize.min.css';`,
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
> Materialize Documentation: [${appData.pkg_documentation.css_framework.materialize.des}](${appData.pkg_documentation.css_framework.materialize.link})`,
  });
}
