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
  "context_path",
  "context_theme_path",
  "theme_context_file_path",
  "theme_provider_file_path",
  "use_theme_file_path",
  "store_path",
  "store_file_path",
  "store_slices_path",
  "slices_index_file_path",
  "slices_counter_file_path",
  "zustand_use_counter_file_path",
  "zustand_index_file_path",

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
  "theme_context_file_template",
  "theme_provider_file_template",
  "use_theme_file_template",
  "store_file_template",
  "slices_index_file_template",
  "slices_counter_file_template",
  "zustand_use_counter_file_template",
  "zustand_index_file_template",
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
    context_path: path.resolve(full_project_path, "src", `context`),
    context_theme_path: path.resolve(
      full_project_path,
      "src",
      `context`,
      "theme"
    ),
    theme_context_file_path: path.resolve(
      full_project_path,
      "src",
      `context`,
      "theme",
      `ThemeContext.${js_or_ts}`
    ),
    theme_provider_file_path: path.resolve(
      full_project_path,
      "src",
      `context`,
      "theme",
      `ThemeProvider.${js_or_ts}x`
    ),
    use_theme_file_path: path.resolve(
      full_project_path,
      "src",
      `context`,
      "theme",
      `useTheme.${js_or_ts}`
    ),
    store_path: path.resolve(full_project_path, "src", `store`),
    store_file_path: path.resolve(
      full_project_path,
      "src",
      `store`,
      `store.${js_or_ts}`
    ),
    store_slices_path: path.resolve(
      full_project_path,
      "src",
      `store`,
      "slices"
    ),
    slices_index_file_path: path.resolve(
      full_project_path,
      "src",
      `store`,
      "slices",
      `index.${js_or_ts}`
    ),
    slices_counter_file_path: path.resolve(
      full_project_path,
      "src",
      `store`,
      "slices",
      `counterSlice.${js_or_ts}`
    ),
    zustand_use_counter_file_path: path.resolve(
      full_project_path,
      "src",
      `store`,
      `useCounterStore.${js_or_ts}`
    ),
    zustand_index_file_path: path.resolve(
      full_project_path,
      "src",
      `store`,
      `index.${js_or_ts}`
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
    theme_context_file_template: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "state_management",
      "context",
      "theme_context.template"
    ),
    theme_provider_file_template: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "state_management",
      "context",
      "theme_provider.template"
    ),
    use_theme_file_template: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "state_management",
      "context",
      "use_theme.template"
    ),
    store_file_template: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "state_management",
      "store",
      "store.template"
    ),
    slices_index_file_template: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "state_management",
      "store",
      "index.template"
    ),
    slices_counter_file_template: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "state_management",
      "store",
      "counter_slice.template"
    ),
    zustand_use_counter_file_template: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "state_management",
      "zustand",
      `use_counter_store.template`
    ),
    zustand_index_file_template: path.resolve(
      nizam_templates_path,
      "react",
      js_or_ts,
      "state_management",
      "zustand",
      `index.template`
    ),
  };
}

export default pathBox;
