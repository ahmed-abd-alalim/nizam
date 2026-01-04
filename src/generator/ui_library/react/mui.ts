import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/config.json" with { type: 'json' };

export async function MUI() {
  const appData = Data;

  await nizamDocEditor({
    title_params: "Material UI",
    expla_params: `
> [!TIP]
> MUI Documentation: [${appData.pkg_documentation.ui_library.mui.des}](${appData.pkg_documentation.ui_library.mui.link})`,
  });
}
