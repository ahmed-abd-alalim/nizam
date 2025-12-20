import { ensureDir, readJson, outputJson } from "../utils/fs.js";
import { extractMainMessage } from "../utils/filter_error_message.js";
import { useContext } from "../core/context/runtime.js";

export async function CreatVSCFolder() {
  const ctx = useContext();
  const vsc_path = `${ctx.full_project_path}\\.vscode`;
  const vsc_setting_path = `${vsc_path}\\settings.json`;
  const vsc_settings_templates = `${ctx.bango_templates_path}\\vscode\\settings.template`;

  try {
    await ensureDir(vsc_path);
    let data = await readJson(vsc_settings_templates);

    if (ctx.user_options.js_framework.includes("ts")) {
      data = {
        ...data,
        "[typescript]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode",
        },
      };
    }
    if (ctx.user_options.CSS_framework === "Tailwind") {
      data = {
        ...data,
        "files.associations": {
          "*.css": "tailwindcss",
        },
      };
    }

    await outputJson(vsc_setting_path, data, { spaces: 2 });

    ctx.operation_state.creat_project_folder.status = "success";
  } catch (err: any) {
    ctx.operation_state.creat_project_folder.status = "fatal";
    ctx.operation_state.creat_project_folder.error_message =
      extractMainMessage(err);
  }
}
