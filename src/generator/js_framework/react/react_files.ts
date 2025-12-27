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


export async function ReactFiles() {
  const {
    full_project_path,
    user_options,
    nizam_templates_path,
  } = useContext();
  const old_gitignore_path = `${full_project_path}\\_gitignore`;
  const new_gitignore_path = `${full_project_path}\\.gitignore`;
  const nizam_Instructions_path = `${full_project_path}\\NIZAM_DOC.md`;
  const nizam_Instructions_templates = `${nizam_templates_path}\\NIZAM_DOC.template`;
  const README_path = `${full_project_path}\\README.md`;
  const index_css_path = `${full_project_path}\\src\\index.css`;
  const index_html_path = `${full_project_path}\\index.html`;
  const index_title = `<title>nizam - add your website name (${user_options.project_name}) here</title>`;
  const public_path = `${full_project_path}\\public`;
  const app_css_path = `${full_project_path}\\src\\app.css`;
  const assets_folder_path = `${full_project_path}\\src\\assets`;
  const app_react_path = `${full_project_path}\\src\\app.${
    user_options.js_framework.includes("js") ? "jsx" : "tsx"
  }`;
  const app_react_templates = `${nizam_templates_path}\\react\\${
    user_options.js_framework.includes("js") ? "js" : "ts"
  }\\app.template`;
  const vite_config_path = `${full_project_path}\\vite.config.${
    user_options.js_framework.includes("js") ? "js" : "ts"
  }`;
  const vite_config_templates = `${nizam_templates_path}\\react\\${
    user_options.js_framework.includes("js") ? "js" : "ts"
  }\\vite.config.template`;

  const main_react_path = `${full_project_path}\\main.${
    user_options.js_framework.includes("js") ? "js" : "ts"
  }`;
  const main_react_templates = `${nizam_templates_path}\\react\\${
    user_options.js_framework.includes("js") ? "js" : "ts"
  }\\main.template`;

  try {
    // fixed _gitignore file name
    if (await pathExists(old_gitignore_path))
      await rename(old_gitignore_path, new_gitignore_path);

    // make nizam Instructions file
    const nizam_Instructions_text = await readFile(
      nizam_Instructions_templates,
      "utf8"
    );
    await ensureFile(nizam_Instructions_path);
    await writeFile(nizam_Instructions_path, nizam_Instructions_text, "utf8");

    // clean README.md file
    await ensureFile(README_path);
    await writeFile(README_path, `# ${user_options.project_name}`, "utf8");

    // clean index.css
    await ensureFile(index_css_path);
    await writeFile(index_css_path, "", "utf8");

    // clean public folder
    await ensureDir(public_path);
    await emptyDir(public_path);

    // edit title in index.html
    const html = await readFile(index_html_path, "utf8");
    const updatedHtml = html.replace(/<title>(.*?)<\/title>/i, index_title);
    await writeFile(index_html_path, updatedHtml, "utf8");

    // remove app.css
    await remove(app_css_path);

    // remove src/assets folder
    await remove(assets_folder_path);

    // new app file
    const app_react_text = await readFile(app_react_templates, "utf8");
    await ensureFile(app_react_path);
    await writeFile(app_react_path, app_react_text, "utf8");

    // new vite.config
    const vite_config_text = await readFile(vite_config_templates, "utf8");
    await ensureFile(vite_config_path);
    await writeFile(vite_config_path, vite_config_text, "utf8");

    // new main
    const main_react_text = await readFile(main_react_templates, "utf8");
    await ensureFile(main_react_path);
    await writeFile(main_react_path, main_react_text, "utf8");

    await nizamDocEditor(
      user_options.js_framework,
      "Here’s the clear, correct way to run & build a React app using Vite",
      `
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
> React Documentation: [${appData.pkg_documentation.js_framework.react.des}](${appData.pkg_documentation.js_framework.react.link})`
    );
  } catch (err: any) {
   throw err
  }
}
