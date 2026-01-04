import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/config.json" with { type: 'json' };

export async function Headless() {
  const appData = Data;

  await nizamDocEditor({
    title_params: "Headless UI",
    expla_params: `
> [!TIP]
> Headless UI Documentation: [${appData.pkg_documentation.ui_library.headless.des}](${appData.pkg_documentation.ui_library.headless.link})`,
  });
}
