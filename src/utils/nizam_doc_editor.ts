import { appendFile } from "./fs.js";
import PathBox from "../assets/path/path_react.js";
export async function nizamDocEditor(
  title_params?: string,
  dec_params?: string,
  expla_params?: string
) {
  const path_box = PathBox();

  const new_instructions = `
${title_params && `### ${title_params}`}

${dec_params && `#### ${dec_params}`}

${expla_params && expla_params}

  ---
  `;

  await appendFile(path_box.nizam_Instructions_path, new_instructions);
}
