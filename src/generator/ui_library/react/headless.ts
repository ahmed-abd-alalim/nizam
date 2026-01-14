import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/storage/resources.json" with { type: 'json' };

export async function Headless() {
  const {ui_library} = Data;

  await nizamDocEditor({
    title_params: "Headless UI",
    expla_params: `
> [!TIP]
> Headless UI Documentation: [${ui_library.documentation.headless.des}](${ui_library.documentation.headless.link})`,
  });
}
