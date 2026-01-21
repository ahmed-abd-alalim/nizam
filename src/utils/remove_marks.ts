import { readFile, writeFile, readdir, lstat } from "./fs.js";
import { useContext } from "../core/context/runtime.js";
import path from "path";
import { extractMainMessage } from "../utils/filter_error_message.js";

export async function cleanFolder() {
  const { full_project_path, operation_state } = useContext();
  const MARK = "##-nizam@mark-##:";

  const remove_mark = async (dir: string) => {
    const items = await readdir(dir);
    const IGNORE_FILES = new Set([
      "NIZAM_DOC.md",
      "package.json",
      ".gitignore",
      "README.md",
      "tsconfig.app.json",
      "tsconfig.json",
      "tsconfig.node.json",
      "index.html",
      "eslint.config.js",
      "public",
    ]);

    for (const item of items) {
      if (IGNORE_FILES.has(item)) continue;

      const fullPath = path.join(dir, item);
      const stat = await lstat(fullPath);

      if (stat.isDirectory()) {
        await remove_mark(fullPath);
      } else if (stat.isFile()) {
        let content = await readFile(fullPath, "utf8");

        const lines = content.split(/\r?\n/);

        const cleanedLines = lines
          .map((line) => {
            if (line.includes(MARK)) {
              const newLine = line.replace(new RegExp(`${MARK}\\S+`, "g"), "");

              return newLine.trim() === "" ? null : newLine;
            }
            return line;
          })
          .filter(Boolean);

        const cleanedContent = cleanedLines.join("\n");

        await writeFile(fullPath, cleanedContent, "utf8");
      }
    }
  };

  try {
    await remove_mark(full_project_path);
    operation_state.clean_folder_mark.status = "success";
  } catch (err) {
    operation_state.clean_folder_mark.status = "fatal";
    operation_state.clean_folder_mark.error_message = extractMainMessage(err);
  }
}
