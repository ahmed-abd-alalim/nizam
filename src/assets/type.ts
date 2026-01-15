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
  state_management: string;
  head_management: string;
  data_fetching: string;
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
  state_management: one_operation_state_type;
  head_management: one_operation_state_type;
  data_fetching: one_operation_state_type;
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

interface documentation_resources_type {
  des: string;
  link: string;
}

export interface options_resources_type {
  forEach?: any;
  some?: any;
  name: string;
  value: string;
  description?: string;
}

export interface resources_type {
  js_framework: {
    name: string;
    type: string;
    options: options_resources_type[];
    documentation: {
      react: documentation_resources_type;
    };
    terminal_command: {
      react: {
        js: string;
        ts: string;
      };
    };
    description: string;
  };
  css_framework: {
    name: string;
    type: string;
    options: options_resources_type[];
    documentation: {
      bootstrap: documentation_resources_type;
      tailwindcss: documentation_resources_type;
      bulma: documentation_resources_type;
      foundation: documentation_resources_type;
      materialize: documentation_resources_type;
    };
    description: string;
  };
  ui_library: {
    name: string;
    type: string;
    options: options_resources_type[];
    documentation: {
      mui: documentation_resources_type;
      ant: documentation_resources_type;
      headless: documentation_resources_type;
    };
    description: string;
  };
  routing_library: {
    name: string;
    type: string;
    options: options_resources_type[];
    documentation: {
      react_router: documentation_resources_type;
      tanStack_router: documentation_resources_type;
      wouter: documentation_resources_type;
    };
    description: string;
  };
  react_router_rout_ways: {
    name: string;
    type: string;
    depended_on: string;
    options: options_resources_type[];
    description: string;
  };
  state_management: {
    name: string;
    type: string;
    options: options_resources_type[];
    documentation: {
      react_context_api: documentation_resources_type;
      redux_toolkit: documentation_resources_type;
      zustand: documentation_resources_type;
    };
    description: string;
  };
  icon_library: {
    name: string;
    type: string;
    options: options_resources_type[];
    documentation: {
      react_icons: documentation_resources_type;
      lucide_react: documentation_resources_type;
      material_icons: documentation_resources_type;
      lord_icon: documentation_resources_type;
    };
    description: string;
  };
  head_management: {
    name: string;
    type: string;
    options: options_resources_type[];
    documentation: {
      react_helmet_async: documentation_resources_type;
      "@dr.pogodin/react-helmet": documentation_resources_type;
      unhead: documentation_resources_type;
    };
    description: string;
  };
  data_fetching: {
    name: string;
    type: string;
    options: options_resources_type[];
    documentation: {
      axios: documentation_resources_type;
      tanstack_query: documentation_resources_type;
      swr: documentation_resources_type;
    };
    description: string;
  };
}
