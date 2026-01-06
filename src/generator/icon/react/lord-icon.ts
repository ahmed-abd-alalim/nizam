import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/config.json" with { type: 'json' };
import { useContext } from "../../../core/context/runtime.js";

export async function LordIcon() {
  const { user_options } = useContext();
  const appData = Data;

  await nizamDocEditor({
    title_params: "Lord Icon",
    dec_params: `Lord Icon is animated SVG icons with a React wrapper.`,
    expla_params: `
${
  user_options.files_structure_names.includes("icons") ||
  user_options.icon_library.length !== 0
    ? `
> [!NOTE]  
> Import all icons from one file (clean way).
> We have created a \`icon.${
        user_options.js_framework.includes("js") ? "js" : "ts"
      }\` file to use it which you will find in \`src/assets/icon.${
        user_options.js_framework.includes("js") ? "js" : "ts"
      }\``
    : ""
}

> [!TIP]
> Lord Icon Documentation: [${
      appData.pkg_documentation.icon_library.lord_icon.des
    }](${appData.pkg_documentation.icon_library.lord_icon.link})`,
  });
}
