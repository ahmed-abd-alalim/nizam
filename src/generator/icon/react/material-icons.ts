import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/storage/resources.json" with { type: 'json' };

export async function MaterialIcons() {
  const {icon_library} = Data;

  await nizamDocEditor({
    title_params: "Material Icons",
    expla_params: `
> [!TIP]
> Material Icons Documentation: [${icon_library.documentation.material_icons.des}](${icon_library.documentation.material_icons.link})`,
  });
}
