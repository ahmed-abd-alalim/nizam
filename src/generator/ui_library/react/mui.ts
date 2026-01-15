import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import resources_json from "../../../assets/storage/resources.json" with { type: "json" };
import type { resources_type } from "../../../assets/type.js";

export async function MUI() {
  const { ui_library }: resources_type = resources_json;

  await nizamDocEditor({
    title_params: "Material UI",
    expla_params: `
> [!TIP]
> MUI Documentation: [${ui_library.documentation.mui.des}](${ui_library.documentation.mui.link})`,
  });
}
