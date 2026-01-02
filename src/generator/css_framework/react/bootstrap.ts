import { readFile, appendFile } from "../../../utils/fs.js";
import { UsingMark } from "../../../utils/using_mark.js";
import PathBox from "../../../assets/path/path_react.js";
import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import { useContext } from "../../../core/context/runtime.js";
import Data from "../../../assets/config.json" with { type: 'json' };

export async function Bootstrap() {
  const { user_options } = useContext();
  const path_box = PathBox();
  const appData: any = Data;

  const main_file_data = [
    {
      tage_name: "bootstrap_min",
      content: `import 'bootstrap/dist/css/bootstrap.min.css';`,
    },
    {
      tage_name: "bootstrap_bundle",
      content: `import 'bootstrap/dist/js/bootstrap.bundle.min.js';`,
    },
  ];

  try {
    await UsingMark(path_box.main_react_path, main_file_data);

    // edit index.css
    const bootstrap_text = await readFile(path_box.bootstrap_templates, "utf8");
    await appendFile(path_box.index_css_path, bootstrap_text);
    await nizamDocEditor({
      title_params: user_options.CSS_framework,
      expla_params: `
We have created a clear and ready made structure that you can use. you will find it inside \`index.css\` file.

> [!TIP]
> Bootstrap Documentation: [${appData.pkg_documentation.css_framework.bootstrap.des}](${appData.pkg_documentation.css_framework.bootstrap.link})`,
    });
  } catch (err: any) {
    throw err;
  }
}
