import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/config.json" with { type: 'json' };

export async function MaterialIcons() {
  const appData = Data;

  await nizamDocEditor({
    title_params: "Material Icons",
    expla_params: `
> [!TIP]
> Material Icons Documentation: [${appData.pkg_documentation.icon_library.material_icons.des}](${appData.pkg_documentation.icon_library.material_icons.link})`,
  });
}
