import { nizamDocEditor } from "../../utils/nizam_doc_editor.js";
import resources_json from "../../assets/storage/resources.json" with { type: "json" };
import { useContext } from "../../core/context/runtime.js";
import { UsingMark } from "../../utils/using_mark.js";
import PathBox from "../../assets/path/path_react.js";
import { ensureFile, readFile, writeFile } from "../../utils/fs.js";
import type { resources_type } from "../../assets/type.js";

export async function ReactRouter() {
  const { user_options } = useContext();
  const path_box = PathBox();
  const { routing_library }: resources_type = resources_json;

  const read_wride_maker = async (
    template_file: string,
    write_file: string,
  ): Promise<void> => {
    const main_react_text = await readFile(template_file, "utf8");
    await ensureFile(write_file);
    await writeFile(write_file, main_react_text, "utf8");
  };

  const app_file_data = [
    {
      tage_name: "rr_class_import",
      content: `import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";`,
    },
    {
      tage_name: "rr_class_start_rout",
      content: `
<Router>
  <Routes>
    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="/home" element={"#name of component#"} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</Router>`,
    },
  ];

  const main_file_data = [
    {
      tage_name: "rr_data_import",
      content: `import { RouterProvider } from "react-router-dom";`,
    },
  ];

  const layout_file_data = [
    {
      tage_name: "rr_Outlet_import",
      content: `import { Outlet } from "react-router-dom";`,
    },
  ];

  if (user_options.react_router_rout.includes("Classic Router")) {
    await UsingMark(path_box.app_react_path, app_file_data);
  } else if (user_options.react_router_rout.includes("Data Router")) {
    let file_content = await readFile(path_box.main_react_path, "utf8");
    file_content = file_content.replace(
      `import App from './App.${
        user_options.js_framework.includes("js") ? "js" : "ts"
      }x'`,
      `import router from "./router";`,
    );
    file_content = file_content.replace(
      `<App />`,
      `<RouterProvider router={router} />`,
    );
    await writeFile(path_box.main_react_path, file_content, "utf8");

    await UsingMark(path_box.main_react_path, main_file_data);
    await UsingMark(path_box.layout_path, layout_file_data);

    await read_wride_maker(
      path_box.reactrouter_router_templates,
      path_box.reactrouter_router_path,
    );
  }

  await nizamDocEditor({
    title_params: "React Router",
    dec_params: `React Router is the most popular routing library for React.`,
    expla_params: `
  It lets you handle client-side routing in single-page applications (SPAs) with dynamic URLs, nested routes, and more.

${
  user_options.files_structure_names.includes("routing.json") ||
  !user_options.routing_library
    ? ""
    : `
> [!NOTE]
> add all routing paths from one file (clean way).
> We have created a \`routing.json\` file to use it which you will find in \`src/assets/routing.json\`
`
}

> [!TIP]
> React Icons Documentation: [${
      routing_library.documentation.react_router.des
    }](${routing_library.documentation.react_router.link})`,
  });
}
