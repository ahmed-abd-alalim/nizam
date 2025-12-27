import { execution_context_type } from "../../assets/type.js";

export function createContext(): execution_context_type {
  const one_operation_state = { status: "", error_message: "" };

  return {
    internet_conection: false,
    start_menu_options: "",
    full_project_path: "",
    nizam_templates_path: "",
    user_options: {
      project_path: "",
      project_name: "",
      pkg_manager: "",
      js_framework: "",
      add_aliase: false,
      CSS_framework: "",
      react_router: false,
    },
    operation_state: {
      creat_project_folder: one_operation_state,
      js_framework: one_operation_state,
      creat_vsc_folder: one_operation_state,
      add_aliase: one_operation_state,
      CSS_framework: one_operation_state,
      react_router: one_operation_state,
    },
  };
}
