import { execution_context_type } from "../../assets/type.js";

export function createContext(): execution_context_type {
  const one_operation_state = { status: "", error_message: "" };

  return {
    internet_conection: false,
    start_menu_options: "",
    full_project_path: "",
    nizam_templates_path: "",
    nizam_media_path: "",
    pkg_is_installed: [],
    reset_menu: false,
    user_options: {
      project_path: "",
      project_name: "",
      pkg_manager: "",
      js_framework: "",
      add_aliase: false,
      css_framework: "",
      app_structure: "",
      folder_structure_names: [],
      files_structure_names: [],
      ui_library: [],
      icon_library: [],
      routing_library: "",
      react_router_rout: "",
      state_management: "",
      head_management: "",
      data_fetching: "",
    },
    operation_state: {
      creat_project_folder: structuredClone(one_operation_state),
      js_framework: structuredClone(one_operation_state),
      creat_vsc_folder: structuredClone(one_operation_state),
      add_aliase: structuredClone(one_operation_state),
      css_framework: structuredClone(one_operation_state),
      app_structure: structuredClone(one_operation_state),
      ui_library: structuredClone(one_operation_state),
      routing_library: structuredClone(one_operation_state),
      icon_library: structuredClone(one_operation_state),
      state_management: structuredClone(one_operation_state),
      head_management: structuredClone(one_operation_state),
      data_fetching: structuredClone(one_operation_state),
      install_all_packages: structuredClone(one_operation_state),
      clean_folder_mark: structuredClone(one_operation_state),
      build_nizam_doc_html: structuredClone(one_operation_state),
    },
  };
}
