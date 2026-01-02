import { execution_context_type } from "../../assets/type.js";

export function createContext(): execution_context_type {
  const one_operation_state = { status: "", error_message: "" };

  return {
    internet_conection: false,
    start_menu_options: "",
    full_project_path: "",
    nizam_templates_path: "",
    pkg_is_installed: [],
    user_options: {
      project_path: "",
      project_name: "",
      pkg_manager: "",
      js_framework: "",
      add_aliase: false,
      CSS_framework: "",
      app_structure: "",
      folder_structure_names: [],
      files_structure_names: [],
    },
    operation_state: {
      creat_project_folder: one_operation_state,
      js_framework: one_operation_state,
      creat_vsc_folder: one_operation_state,
      add_aliase: one_operation_state,
      CSS_framework: one_operation_state,
      app_structure: one_operation_state,
      install_all_packages: one_operation_state,
    },
  };
}
