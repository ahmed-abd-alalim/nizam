import { useContext } from "../../core/context/runtime.js";

const keys = [
  "tsconfig_app_path",
  "jsconfig_app_path",
  "vite_config_path",
  "vsc_path",
  "vsc_setting_path",
  "index_css_path",
  "main_react_path",
  "old_gitignore_path",
  "new_gitignore_path",
  "nizam_Instructions_path",
  "README_path",
  "index_html_path",
  "public_path",
  "app_css_path",
  "assets_folder_path",
  "app_react_path",
  "jsconfig_app_template",
  "vsc_settings_templates",
  "bootstrap_templates",
  "tailwind_templates",
  "nizam_Instructions_templates",
  "index_css_templates",
  "app_react_templates",
  "vite_config_templates",
  "main_react_templates",
] as const;

export type path_box_type = Record<(typeof keys)[number], string>;

function pathBox(): path_box_type {
  const { full_project_path, nizam_templates_path, user_options } =
    useContext();
  const js_or_ts = user_options.js_framework.includes("js") ? "js" : "ts";
  return {
    // nizam-app
    tsconfig_app_path: `${full_project_path}\\tsconfig.app.json`,
    jsconfig_app_path: `${full_project_path}\\jsconfig.json`,
    vite_config_path: `${full_project_path}\\vite.config.${js_or_ts}`,
    vsc_path: `${full_project_path}\\.vscode`,
    vsc_setting_path: `${full_project_path}\\.vscode\\settings.json`,
    index_css_path: `${full_project_path}\\src\\index.css`,
    main_react_path: `${full_project_path}\\src\\main.${js_or_ts}x`,
    old_gitignore_path: `${full_project_path}\\_gitignore`,
    new_gitignore_path: `${full_project_path}\\.gitignore`,
    nizam_Instructions_path: `${full_project_path}\\NIZAM_DOC.md`,
    README_path: `${full_project_path}\\README.md`,
    index_html_path: `${full_project_path}\\index.html`,
    public_path: `${full_project_path}\\public`,
    app_css_path: `${full_project_path}\\src\\app.css`,
    assets_folder_path: `${full_project_path}\\src\\assets`,
    app_react_path: `${full_project_path}\\src\\App.${js_or_ts}x`,

    // nizam-main
    jsconfig_app_template: `${nizam_templates_path}\\react\\${js_or_ts}\\jsconfig.template`,
    vsc_settings_templates: `${nizam_templates_path}\\vscode\\settings.template`,
    bootstrap_templates: `${nizam_templates_path}\\react\\css\\bootstrap.template`,
    tailwind_templates: `${nizam_templates_path}\\react\\css\\tailwind.template`,
    nizam_Instructions_templates: `${nizam_templates_path}\\NIZAM_DOC.template`,
    index_css_templates: `${nizam_templates_path}\\react\\css\\index.template`,
    app_react_templates: `${nizam_templates_path}\\react\\${js_or_ts}\\app.template`,
    vite_config_templates: `${nizam_templates_path}\\react\\${js_or_ts}\\vite.config.template`,
    main_react_templates: `${nizam_templates_path}\\react\\${js_or_ts}\\main.template`,
  };
}

export default pathBox;
