import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import Data from "../../../assets/storage/resources.json" with { type: 'json' };
import { useContext } from "../../../core/context/runtime.js";

export async function ReactIcons() {
  const { user_options } = useContext();
  const {icon_library} = Data;

  await nizamDocEditor({
    title_params: "React Icons",
    dec_params: `React Icons is a library that gives you icons as React components.`,
    expla_params: `
You don’t use images or SVG files manually you just import the icon and use it like a component.

#### Explanation of some of the shortcuts found within the library:
| Prefix | Library |
|------|---------|
| \`fa\` | Font Awesome |
| \`md\` | Material Design |
| \`ai\` | Ant Design |
| \`bs\` | Bootstrap Icons |
| \`hi\` | Heroicons |

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
> React Icons Documentation: [${
     icon_library.documentation.react_icons.des
    }](${icon_library.documentation.react_icons.link})`,
  });
}
