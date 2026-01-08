export interface user_options_type {
  project_path: string;
  project_name: string;
  pkg_manager: string;
  js_framework: string;
  add_aliase: boolean;
  CSS_framework: string;
  app_structure: string;
  folder_structure_names: string[];
  files_structure_names: string[];
  ui_library: string[];
  icon_library: string[];
  routing_library: string;
  react_router_rout: string;
}

export interface one_operation_state_type {
  status?: string;
  error_message?: string;
}

export interface operation_state_type {
  creat_project_folder: one_operation_state_type;
  js_framework: one_operation_state_type;
  creat_vsc_folder: one_operation_state_type;
  add_aliase: one_operation_state_type;
  CSS_framework: one_operation_state_type;
  app_structure: one_operation_state_type;
  ui_library: one_operation_state_type;
  icon_library: one_operation_state_type;
  routing_library: one_operation_state_type;
  install_all_packages: one_operation_state_type;
}

export interface execution_context_type {
  internet_conection: boolean;
  start_menu_options: string;
  full_project_path: string;
  nizam_templates_path: string;
  pkg_is_installed: string[];
  user_options: user_options_type;
  operation_state: operation_state_type;
}
