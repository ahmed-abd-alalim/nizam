import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import resources_json from "../../../assets/storage/resources.json" with { type: "json" };
import type { resources_type } from "../../../assets/type.js";
export async function MaterialIcons() {
  const { icon_library }: resources_type = resources_json;

  await nizamDocEditor({
    title_params: "Material Icons",
    expla_params: `
> [!TIP]
> Material Icons Documentation: [${icon_library.documentation.material_icons.des}](${icon_library.documentation.material_icons.link})`,
  });
}
