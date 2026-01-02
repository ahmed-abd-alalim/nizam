import {
  ensureFile,
  writeFile,
  emptyDir,
  ensureDir,
  remove,
  readFile,
  rename,
  pathExists,
} from "../../../utils/fs.js";
import { useContext } from "../../../core/context/runtime.js";
import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import appData from "../../../assets/config.json" with { type: 'json' };
import PathBox from "../../../assets/path/path_react.js";

export async function ReactFiles() {
  const { user_options } = useContext();
  const path_box = PathBox();
  const index_title = `<title>nizam - add your website name (${user_options.project_name}) here</title>`;

  try {
    // fixed _gitignore file name
    if (await pathExists(path_box.old_gitignore_path))
      await rename(path_box.old_gitignore_path, path_box.new_gitignore_path);

    // make nizam Instructions file
    const nizam_Instructions_text = await readFile(
      path_box.nizam_Instructions_templates,
      "utf8"
    );
    await ensureFile(path_box.nizam_Instructions_path);
    await writeFile(
      path_box.nizam_Instructions_path,
      nizam_Instructions_text,
      "utf8"
    );

    // clean README.md file
    await ensureFile(path_box.README_path);
    await writeFile(
      path_box.README_path,
      `# ${user_options.project_name}`,
      "utf8"
    );

    // clean index.css
    const index_css_text = await readFile(path_box.index_css_templates, "utf8");
    await ensureFile(path_box.index_css_path);
    await writeFile(path_box.index_css_path, index_css_text, "utf8");

    // clean public folder
    await ensureDir(path_box.public_path);
    await emptyDir(path_box.public_path);

    // edit title in index.html
    const html = await readFile(path_box.index_html_path, "utf8");
    const updatedHtml = html.replace(/<title>(.*?)<\/title>/i, index_title);
    await writeFile(path_box.index_html_path, updatedHtml, "utf8");

    // remove app.css
    await remove(path_box.app_css_path);

    // remove src/assets folder
    await remove(path_box.assets_folder_path);

    // new app file
    const app_react_text = await readFile(path_box.app_react_templates, "utf8");
    await ensureFile(path_box.app_react_path);
    await writeFile(path_box.app_react_path, app_react_text, "utf8");

    // new vite.config
    const vite_config_text = await readFile(
      path_box.vite_config_templates,
      "utf8"
    );
    await ensureFile(path_box.vite_config_path);
    await writeFile(path_box.vite_config_path, vite_config_text, "utf8");

    // new main
    const main_react_text = await readFile(
      path_box.main_react_templates,
      "utf8"
    );
    await ensureFile(path_box.main_react_path);
    await writeFile(path_box.main_react_path, main_react_text, "utf8");

    await nizamDocEditor({
      title_params: user_options.js_framework,
      dec_params:
        "Here’s the clear, correct way to run & build a React app using Vite",
      expla_params: `
Run (Development mode)
\`\`\`bash 
npm run dev
\`\`\`

You’ll see something like:
\`\`\`bash 
Local: http://localhost:5173/
\`\`\`

Build (Production)
\`\`\`bash 
npm run build
\`\`\`

> [!TIP]
> React Documentation: [${appData.pkg_documentation.js_framework.react.des}](${appData.pkg_documentation.js_framework.react.link})`,
    });
  } catch (err: any) {
    throw err;
  }
}
