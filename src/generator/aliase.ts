import { extractMainMessage } from "../utils/filter_error_message.js";
import { readJson, readFile, outputJson, writeFile } from "../utils/fs.js";
import { useContext } from "../core/context/runtime.js";
import stripJsonComments from "strip-json-comments";
import { nizamDocEditor } from "../utils/nizam_doc_editor.js";

export async function Aliase() {
  const {
    operation_state,
    full_project_path,
    user_options,
    nizam_templates_path,
  } = useContext();

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

  const tsconfig_app_path = `${full_project_path}\\tsconfig.app.json`;
  const jsconfig_app_path = `${full_project_path}\\jsconfig.json`;
  const jsconfig_app_template = `${nizam_templates_path}\\js\\react\\jsconfig.template`;
  const vite_config_path = `${full_project_path}\\vite.config.${
    user_options.js_framework.includes("js") ? "js" : "ts"
  }`;

  try {
    let vite_config_content = await readFile(vite_config_path, "utf8");

    vite_config_file_data.forEach((_) => {
      vite_config_content = vite_config_content.replace(
        `##-nizam@mark-##:${_.tage_name}`,
        _.content
      );
    });
    await writeFile(vite_config_path, vite_config_content, "utf8");

    if (user_options.js_framework.includes("js")) {
      // make jsconfig file
      const jsconfig_app_contant = await readJson(
        jsconfig_app_template,
        "utf8"
      );
      await outputJson(jsconfig_app_path, jsconfig_app_contant, { spaces: 2 });
    } else {
      // edit tsconfig.app.json for @ alise apped to json
      const tsconfig_app_cotant = await readFile(tsconfig_app_path, "utf8");
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
      await outputJson(tsconfig_app_path, new_tsconfig_app_cotant, {
        spaces: 2,
      });
    }

    await nizamDocEditor(
      "aliase (@)",
      "you can use it inside code to move between folder fast",
      "import {  } from '@/';"
    );
    operation_state.js_framework.status = "success";
  } catch (err: any) {
    operation_state.js_framework.status = "fatal";
    operation_state.js_framework.error_message = extractMainMessage(err);
  }
}
