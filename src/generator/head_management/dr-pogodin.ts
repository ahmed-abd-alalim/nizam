import { UsingMark } from "../../utils/using_mark.js";
import PathBox from "../../assets/path/path_react.js";
import { nizamDocEditor } from "../../utils/nizam_doc_editor.js";
import { useContext } from "../../core/context/runtime.js";
import Data from "../../assets/config.json" with { type: 'json' };

export async function Drpogodin() {
  const { user_options } = useContext();
  const path_box = PathBox();
  const appData = Data;

  const main_file_data = [
    {
      tage_name: "import_dr_pogodin_react_helmet_async_provider",
      content: `import { HelmetProvider } from '@dr.pogodin/react-helmet';`,
    },
    {
      tage_name: "open_dr_pogodin_react_helmet_async_provider_tage",
      content: `<HelmetProvider>`,
    },
    {
      tage_name: "close_dr_pogodin_react_helmet_async_provider_tage",
      content: `</HelmetProvider>`,
    },
  ];

  await UsingMark(path_box.main_react_path, main_file_data);

  await nizamDocEditor({
    title_params: user_options.head_management,
    expla_params: `
example on how to use:
\`\`\`
import { Helmet } from '@dr.pogodin/react-helmet';

const home = (
 <>
   <Helmet>
     <title>home</title>
       <link rel="" href="http://example.com" />
       <meta charSet="utf-8" />
       <meta name="description" content="" />
    </Helmet>
    <h1>Hello World</h1>
 </>
);
\`\`\`

> [!TIP]
> Dr. Pogodin React Helmet Documentation: [${appData.pkg_documentation.head_management["@dr.pogodin/react-helmet"].des}](${appData.pkg_documentation.head_management["@dr.pogodin/react-helmet"].link})`,
  });
}
