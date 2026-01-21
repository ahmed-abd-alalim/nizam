import { ensureDir, readJson, outputJson } from "../../utils/fs.js";
import { extractMainMessage } from "../../utils/filter_error_message.js";
import { useContext } from "../../core/context/runtime.js";
import PathBox from "../../assets/path/path_react.js";

export async function CreatVSCFolder() {
  const { user_options, operation_state } = useContext();
  const path_box = PathBox();

  try {
    await ensureDir(path_box.vsc_path);
    let vsc_settings_json = await readJson(path_box.vsc_settings_templates);

    if (user_options.js_framework.includes("ts")) {
      vsc_settings_json = {
        ...vsc_settings_json,
        "[typescript]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode",
        },
      };
    }
    if (user_options.css_framework === "Tailwind") {
      vsc_settings_json = {
        ...vsc_settings_json,
        "files.associations": {
          "*.css": "tailwindcss",
        },
      };
    }

    await outputJson(path_box.vsc_setting_path, vsc_settings_json, {
      spaces: 2,
    });

    operation_state.creat_vsc_folder.status = "success";
  } catch (err: any) {
    operation_state.creat_vsc_folder.status = "fatal";
    operation_state.creat_vsc_folder.error_message = extractMainMessage(err);
  }
}
