import { UsingMark } from "../../../utils/using_mark.js";
import PathBox from "../../../assets/path/path_react.js";
import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/storage/resources.json" with { type: 'json' };

export async function Ant() {
  const path_box = PathBox();
  const {ui_library} = Data;
  const main_data = [
    {
      tage_name: "ant_reset_css",
      content: `import 'antd/dist/reset.css';`,
    },
  ];

  await UsingMark(path_box.main_react_path, main_data);

  await nizamDocEditor({
    title_params: "Ant Design",
    expla_params: `
> [!TIP]
> Ant Design Documentation: [${ui_library.documentation.ant.des}](${ui_library.documentation.ant.link})`,
  });
}
