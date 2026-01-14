import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/storage/resources.json" with { type: 'json' };
import { useContext } from "../../../core/context/runtime.js";

export async function LucideReact() {
  const { user_options } = useContext();
  const {icon_library} = Data;

  await nizamDocEditor({
    title_params: "Lucide React",
    dec_params: `Lucide React is based on SVG and does not require any additional CSS files.`,
    expla_params: `
${
  user_options.files_structure_names.includes("icons") ||
  user_options.icon_library.length !== 0
    ? `
> [!NOTE]  
> Import all icons from one file (clean way).
> We have created a \`icon.${
user_options.js_framework.includes("js") ? "js" : "ts"}\` file to use it which you will find in \`src/assets/icon.${
user_options.js_framework.includes("js") ? "js" : "ts"}\``: ""
}

> [!TIP]
> Lucide React Documentation: [${
      icon_library.documentation.lucide_react.des
    }](${icon_library.documentation.lucide_react.link})`,
  });
}
