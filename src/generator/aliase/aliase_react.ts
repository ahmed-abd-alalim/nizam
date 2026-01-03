import { readJson, readFile, outputJson } from "../../utils/fs.js";
import { useContext } from "../../core/context/runtime.js";
import stripJsonComments from "strip-json-comments";
import { nizamDocEditor } from "../../utils/nizam_doc_editor.js";
import appData from "../../assets/config.json" with { type: 'json' };
import { UsingMark } from "../../utils/using_mark.js";
import PathBox from "../../assets/path/path_react.js";

export async function AliaseReact() {
  const { user_options } = useContext();
  const path_box = PathBox();

  const vite_config_file_data = [
    {
      tage_name: "import_fileURLToPath",
      content: `import { fileURLToPath } from "url";`,
    },
    {
      tage_name: "import_dirname_resolve",
      content: `import { dirname, resolve } from "path";`,
    },
    {
      tage_name: "make__filename",
      content: `const __filename = fileURLToPath(import.meta.url);`,
    },
    {
      tage_name: "make__dirname",
      content: `const __dirname = dirname(__filename);`,
    },
    {
      tage_name: "add_resolve",
      content: `resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },`,
    },
  ];

  await UsingMark(path_box.vite_config_path, vite_config_file_data);

  if (user_options.js_framework.includes("js")) {
    // make jsconfig file
    const jsconfig_app_contant = await readJson(
      path_box.jsconfig_app_template,
      "utf8"
    );
    await outputJson(path_box.jsconfig_app_path, jsconfig_app_contant, {
      spaces: 2,
    });
  } else {
    // edit tsconfig.app.json for @ alise apped to json
    const tsconfig_app_cotant = await readFile(
      path_box.tsconfig_app_path,
      "utf8"
    );
    const tsconfig_app_cotant_parse = JSON.parse(
      stripJsonComments(tsconfig_app_cotant)
    );
    const new_tsconfig_app_cotant = {
      ...tsconfig_app_cotant_parse,
      compilerOptions: {
        ...tsconfig_app_cotant_parse.compilerOptions,
        baseUrl: "src",
        paths: {
          "@/*": ["*"],
        },
      },
    };
    await outputJson(path_box.tsconfig_app_path, new_tsconfig_app_cotant, {
      spaces: 2,
    });
  }

  await nizamDocEditor({
    title_params: "aliase (@)",
    dec_params: "you can use it inside code to move between folder fast",
    expla_params: `
\`\`\`bash 
import {  } from '@/'; 
\`\`\`

> [!TIP]
> Aliase Documentation: [${appData.pkg_documentation.aliases.des}](${appData.pkg_documentation.aliases.link})`,
  });
}
