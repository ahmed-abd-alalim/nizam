import { UsingMark } from "../../utils/using_mark.js";
import PathBox from "../../assets/path/path_react.js";
import { nizamDocEditor } from "../../utils/nizam_doc_editor.js";
import { useContext } from "../../core/context/runtime.js";
import Data from "../../assets/config.json" with { type: 'json' };

export async function Unhead() {
  const { user_options } = useContext();
  const path_box = PathBox();
  const appData = Data;

  const main_file_data = [
    {
      tage_name: "import_unhead_provider",
      content: `import { createHead, UnheadProvider } from '@unhead/react';`,
    },
    {
      tage_name: "import_unhead_createhead",
      content: `const head = createHead();`,
    },
    {
      tage_name: "open_unhead_provider_tage",
      content: `<UnheadProvider head={head}>`,
    },
    {
      tage_name: "close_unhead_provider_tage",
      content: `</UnheadProvider>`,
    },
  ];

  await UsingMark(path_box.main_react_path, main_file_data);

  await nizamDocEditor({
    title_params: user_options.head_management,
    expla_params: `
example on how to use:
\`\`\`
import { useHead } from '@unhead/react';

useHead({
    title: "Home",
    meta: [
      { name: "description", content: "" },
      { name: "keywords", content: "" }
    ],
    link: [
      { rel: "", href: "https://example.com/" }
    ]
});
\`\`\`

> [!TIP]
> Unhead Documentation: [${appData.pkg_documentation.head_management.unhead.des}](${appData.pkg_documentation.head_management.unhead.link})`,
  });
}
