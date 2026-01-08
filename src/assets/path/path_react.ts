import { useContext } from "../../core/context/runtime.js";
import path from "path";

export const keys = [
  "src_path",
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
  "package_json_path",
  "layout_path",
  "reactrouter_router_path",
  "tanstackrouter_router_path",

  "jsconfig_app_template",
  "vsc_settings_templates",
  "bootstrap_templates",
  "tailwind_templates",
  "nizam_Instructions_templates",
  "index_css_templates",
  "app_react_templates",
  "vite_config_templates",
  "main_react_templates",
  "layout_templates",
  "reactrouter_router_templates",
  "tanstackrouter_router_templates",
] as const;

export type path_box_type = Record<(typeof keys)[number], string>;

function pathBox(): path_box_type {
  const { full_project_path, nizam_templates_path, user_options } =
    useContext();
  const js_or_ts = user_options.js_framework.includes("js") ? "js" : "ts";

  return {
    // nizam-app
    src_path: path.resolve(full_project_path, "src"),
    tsconfig_app_path: path.resolve(full_project_path, "tsconfig.app.json"),
    jsconfig_app_path: path.resolve(full_project_path, "jsconfig.json"),
    vite_config_path: path.resolve(
      full_project_path,
      `vite.config.${js_or_ts}`
    ),
    vsc_path: path.resolve(full_project_path, ".vscode"),
    vsc_setting_path: path.resolve(
      full_project_path,
      ".vscode",
      "settings.json"
    ),
    index_css_path: path.resolve(full_project_path, "src", "index.css"),
    main_react_path: path.resolve(
      full_project_path,
      "src",
      `main.${js_or_ts}x`
    ),
    old_gitignore_path: path.resolve(full_project_path, "_gitignore"),
    new_gitignore_path: path.resolve(full_project_path, ".gitignore"),
    nizam_Instructions_path: path.resolve(full_project_path, "NIZAM_DOC.md"),
    README_path: path.resolve(full_project_path, "README.md"),
    index_html_path: path.resolve(full_project_path, "index.html"),
    public_path: path.resolve(full_project_path, "public"),
    app_css_path: path.resolve(full_project_path, "src", "app.css"),
    assets_folder_path: path.resolve(full_project_path, "src", "assets"),
    app_react_path: path.resolve(full_project_path, "src", `App.${js_or_ts}x`),
    package_json_path: path.resolve(full_project_path, "package.json"),
    layout_path: path.resolve(full_project_path, "src", `layout.${js_or_ts}x`),
    reactrouter_router_path: path.resolve(
      full_project_path,
      "src",
      `router.${js_or_ts}x`
    ),
    tanstackrouter_router_path: path.resolve(
      full_project_path,
      "src",
      `router.${js_or_ts}`
    ),

    // nizam-main
    jsconfig_app_template: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "jsconfig.template"
    ),
    vsc_settings_templates: path.resolve(
      nizam_templates_path,
      "vscode",
      "settings.template"
    ),
    bootstrap_templates: path.resolve(
      nizam_templates_path,
      "react",
      "css",
      "bootstrap.template"
    ),
    tailwind_templates: path.resolve(
      nizam_templates_path,
      "react",
      "css",
      "tailwind.template"
    ),
    nizam_Instructions_templates: path.resolve(
      nizam_templates_path,
      "NIZAM_DOC.template"
    ),
    index_css_templates: path.resolve(
      nizam_templates_path,
      "react",
      "css",
      "index.template"
    ),
    app_react_templates: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "app.template"
    ),
    vite_config_templates: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "vite.config.template"
    ),
    main_react_templates: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "main.template"
    ),
    layout_templates: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "layout.template"
    ),
    reactrouter_router_templates: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "react_router-router.template"
    ),
    tanstackrouter_router_templates: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "tanstack_router-router.template"
    ),
  };
}

export default pathBox;
