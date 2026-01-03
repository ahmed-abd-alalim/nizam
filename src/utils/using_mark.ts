import { readFile, writeFile } from "../utils/fs.js";

export async function UsingMark(
  file_path: string,
  data_array: { tage_name: String; content: string }[]
) {
  let file_content = await readFile(file_path, "utf8");

  data_array.forEach((_) => {
    file_content = file_content.replace(
      `##-nizam@mark-##:${_.tage_name}`,
      _.content
    );
  });

  await writeFile(file_path, file_content, "utf8");
}
