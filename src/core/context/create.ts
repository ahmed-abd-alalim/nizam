import { execution_context_type } from "../../assets/type.js";

export function createContext(): execution_context_type {
  return {
    internet_conection: false,
    start_menu_options: "",
    full_project_path: "",
    bango_templates_path: "",
    user_options: {
      project_path: "",
      project_name: "",
      pkg_manager: "",
      js_framework: "",
      clean_app: false,
      add_aliase: false,
      CSS_framework: "",
      react_router: false,
    },
    operation_state: {
      creat_project_folder: { status: "", error_message: "" },
      js_framework: { status: "", error_message: "" },
      clean_app: { status: "", error_message: "" },
      add_aliase: { status: "", error_message: "" },
      CSS_framework: { status: "", error_message: "" },
      react_router: { status: "", error_message: "" },
    },
  };
}
