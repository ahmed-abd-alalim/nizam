import { readFile, appendFile } from "../../../utils/fs.js";
import { UsingMark } from "../../../utils/using_mark.js";
import PathBox from "../../../assets/path/path_react.js";

export async function Bootstrap() {
  const path_box = PathBox();

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
  } catch (err: any) {
    throw err;
  }
}
