import path from "path";
import { fileURLToPath } from "url";
import { useContext } from "../../core/context/runtime.js";

export function CorePaths() {
  const ctx = useContext();

  // get full project path
  const project_Path = path.resolve(
    process.cwd(),
    ctx.user_options.project_path
  );
  ctx.full_project_path = `${project_Path}\\${ctx.user_options.project_name}`;

  // get templates dir
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const TEMPLATES_DIR = path.resolve(__dirname, "templates");
  ctx.nizam_templates_path = TEMPLATES_DIR;
}
