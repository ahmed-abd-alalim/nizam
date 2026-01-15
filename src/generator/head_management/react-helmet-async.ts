import { UsingMark } from "../../utils/using_mark.js";
import PathBox from "../../assets/path/path_react.js";
import { nizamDocEditor } from "../../utils/nizam_doc_editor.js";
import { useContext } from "../../core/context/runtime.js";
import resources_json from "../../assets/storage/resources.json" with { type: "json" };
import type { resources_type } from "../../assets/type.js";
export async function ReactHelmetAsync() {
  const { user_options } = useContext();
  const path_box = PathBox();
  const { head_management }: resources_type = resources_json;

  const main_file_data = [
    {
      tage_name: "import_react_helmet_async_provider",
      content: `import { HelmetProvider } from 'react-helmet-async';`,
    },
    {
      tage_name: "open_react_helmet_async_provider_tage",
      content: `<HelmetProvider>`,
    },
    {
      tage_name: "close_react_helmet_async_provider_tage",
      content: `</HelmetProvider>`,
    },
  ];

  await UsingMark(path_box.main_react_path, main_file_data);

  await nizamDocEditor({
    title_params: user_options.head_management,
    expla_params: `
example on how to use:
\`\`\`
import { Helmet } from 'react-helmet-async';

const home = (
    <>
      <Helmet>
        <title>home</title>
        <link rel="" href="https://example.com/" />
      </Helmet>
      <h1>Hello World</h1>
    </>
);
\`\`\`

> [!TIP]
> React Helmet Async Documentation: [${head_management.documentation.react_helmet_async.des}](${head_management.documentation.react_helmet_async.link})`,
  });
}
