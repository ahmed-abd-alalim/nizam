import { nizamDocEditor } from "../../utils/nizam_doc_editor.js";
import Data from "../../assets/storage/resources.json" with { type: 'json' };
import { useContext } from "../../core/context/runtime.js";
import { UsingMark } from "../../utils/using_mark.js";
import PathBox from "../../assets/path/path_react.js";
import { ensureFile, readFile, writeFile } from "../../utils/fs.js";

export async function TanStackRouter() {
  const { user_options } = useContext();
  const path_box = PathBox();
  const {routing_library} = Data;

  const main_file_data = [
    {
      tage_name: "tr_data_import",
      content: `import { RouterProvider } from '@tanstack/react-router';`,
    },
  ];

  const layout_file_data = [
    {
      tage_name: "tr_Outlet_import",
      content: `import { Outlet } from '@tanstack/react-router';`,
    },
  ];

  const read_wride_maker = async (
    template_file: string,
    write_file: string
  ): Promise<void> => {
    const main_react_text = await readFile(template_file, "utf8");
    await ensureFile(write_file);
    await writeFile(write_file, main_react_text, "utf8");
  };

  let file_content = await readFile(path_box.main_react_path, "utf8");
  file_content = file_content.replace(
    `import App from './App.${
      user_options.js_framework.includes("js") ? "js" : "ts"
    }x'`,
    `import { router } from './router';`
  );
  file_content = file_content.replace(
    `<App />`,
    `<RouterProvider router={router} />`
  );
  await writeFile(path_box.main_react_path, file_content, "utf8");

  await UsingMark(path_box.main_react_path, main_file_data);
  await UsingMark(path_box.layout_path, layout_file_data);

  await read_wride_maker(
    path_box.tanstackrouter_router_templates,
    path_box.tanstackrouter_router_path
  );

  await nizamDocEditor({
    title_params: "TanStack Route",
    dec_params: `TanStack Router is a modern, flexible, fully-featured routing library for React.`,
    expla_params: `
It’s designed to handle complex routing needs in large-scale applications, while still offering strong developer ergonomics.

> [!TIP]
> React Icons Documentation: [${routing_library.documentation.tanStack_router.des}](${routing_library.documentation.tanStack_router.link})`,
  });
}
