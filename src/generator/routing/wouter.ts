import { nizamDocEditor } from "../../utils/nizam_doc_editor.js";
import resources_json from "../../assets/storage/resources.json" with { type: "json" };
import { UsingMark } from "../../utils/using_mark.js";
import PathBox from "../../assets/path/path_react.js";
import type { resources_type } from "../../assets/type.js";

export async function Wouter() {
  const path_box = PathBox();
  const { routing_library }: resources_type = resources_json;
  const app_file_data = [
    {
      tage_name: "wouter_import",
      content: `import { Route } from "wouter";`,
    },
    {
      tage_name: "wouter_example",
      content: `{/*<Route path="/" component={ex:Home} />*/}`,
    },
  ];

  UsingMark(path_box.app_react_path, app_file_data);
  await nizamDocEditor({
    title_params: "Wouter",
    dec_params: `Wouter is a minimalistic React router \`(~1KB gzipped!)\`.`,
    expla_params: `
It provides the essential routing features: <Router>, \`<Route>\`, \`useLocation()\`, and \`useRoute()\`.
It does not include nested routes, transitions, or complicated features—just simple client side routing.

> [!TIP]
> React Icons Documentation: [${routing_library.documentation.wouter.des}](${routing_library.documentation.wouter.link})`,
  });
}
