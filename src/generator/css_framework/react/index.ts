import { useContext } from "../../../core/context/runtime.js";
import { Bootstrap } from "./bootstrap.js";
import { Tailwind } from "./tailwindcss.js";
import { installDeps } from "../../../utils/npm.js";
import Data from "../../../assets/config.json" with { type: 'json' };
import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";

export async function CSSFrameworkReact() {
  const { user_options } = useContext();
  const appData: any = Data;
  
  try {
    if (user_options.CSS_framework === "Bootstrap") {
      await installDeps(user_options.pkg_manager, [
        appData.pkg_terminal_command.css_framework.react.bootstrap,
      ]);
      await Bootstrap();
    } else if (user_options.CSS_framework === "Tailwindcss") {
      await installDeps(user_options.pkg_manager, [
        appData.pkg_terminal_command.css_framework.react.tailwind,
      ]);
      await Tailwind();
    }

    await nizamDocEditor(
      user_options.CSS_framework,
      `
We have created a clear and ready made structure that you can use. you will find it inside \`index.css\` file.

> [!TIP]
> ${user_options.CSS_framework} Documentation: [${
        appData.pkg_documentation.css_framework[
          user_options.CSS_framework.toLowerCase()
        ].des
      }](${
        appData.pkg_documentation.css_framework[
          user_options.CSS_framework.toLowerCase()
        ].link
      })`
    );
  } catch (err: any) {
    throw err;
  }
}
