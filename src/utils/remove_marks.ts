import { readFile, writeFile, readdir, lstat } from "./fs.js";
import { useContext } from "../core/context/runtime.js";
import path from "path";
import { extractMainMessage } from "../utils/filter_error_message.js";

export async function cleanFolder() {
  const { full_project_path, operation_state } = useContext();
  const MARK = "##-nizam@mark-##:";

  try {
    const items = await readdir(full_project_path);

    for (const item of items) {
      const fullPath = path.join(full_project_path, item);

      const stat = await lstat(fullPath);

      if (stat.isDirectory()) {
        await cleanFolder();
      } else if (stat.isFile()) {
        let content = await readFile(fullPath, "utf8");

        const regex = new RegExp(`${MARK}\\S+`, "g");
        const cleaned = content.replace(regex, "");

        await writeFile(fullPath, cleaned, "utf8");
      }
    }

    operation_state.clean_folder_mark.status = "success";
  } catch (err) {
    operation_state.clean_folder_mark.status = "fatal";
    operation_state.clean_folder_mark.error_message = extractMainMessage(err);
  }
}
