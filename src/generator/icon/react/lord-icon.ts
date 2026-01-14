import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/storage/resources.json" with { type: 'json' };
import { useContext } from "../../../core/context/runtime.js";

export async function LordIcon() {
  const { user_options } = useContext();
  const {icon_library} = Data;

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
      icon_library.documentation.lord_icon.des
    }](${icon_library.documentation.lord_icon.link})`,
  });
}
