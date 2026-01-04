import { UsingMark } from "../../../utils/using_mark.js";
import PathBox from "../../../assets/path/path_react.js";
import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/config.json" with { type: 'json' };

export async function Blueprint() {
  const path_box = PathBox();
  const appData = Data;
  const main_data = [
    {
      tage_name: "blueprintui_themes",
      content: `import '@blueprintui/themes/index.min.css';`,
    },
    {
      tage_name: "blueprintui_layout",
      content: `import '@blueprintui/layout/index.min.css';`,
    },
  ];

  await UsingMark(path_box.main_react_path, main_data);

  await nizamDocEditor({
    title_params: "Blueprint UI",
    expla_params: `
> [!TIP]
> Blueprint UI Documentation: [${appData.pkg_documentation.ui_library.blueprint.des}](${appData.pkg_documentation.ui_library.blueprint.link})`,
  });
}
