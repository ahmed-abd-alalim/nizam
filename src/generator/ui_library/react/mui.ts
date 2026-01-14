import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/storage/resources.json" with { type: 'json' };

export async function MUI() {
  const {ui_library} = Data;

  await nizamDocEditor({
    title_params: "Material UI",
    expla_params: `
> [!TIP]
> MUI Documentation: [${ui_library.documentation.mui.des}](${ui_library.documentation.mui.link})`,
  });
}
