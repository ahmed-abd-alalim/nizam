export interface user_options_type {
  project_path: string;
  project_name: string;
  pkg_manager: string;
  js_framework: string;
  clean_app: boolean;
  add_aliase: boolean;
  CSS_framework: string;
  react_router: boolean;
}

export interface one_operation_state_type {
  status?: string;
  error_message?: string;
}

export interface operation_state_type {
  creat_project_folder: one_operation_state_type;
  js_framework: one_operation_state_type;
  creat_vsc_folder: one_operation_state_type;
  clean_app: one_operation_state_type;
  add_aliase: one_operation_state_type;
  CSS_framework: one_operation_state_type;
  react_router: one_operation_state_type;
}

export interface execution_context_type {
  internet_conection: boolean;
  start_menu_options: string;
  full_project_path: string;
  bango_templates_path: string;
  user_options: user_options_type;
  operation_state: operation_state_type;
}
