import { appendFile } from "./fs.js";
import PathBox from "../assets/path/path_react.js";

interface nizam_doc_contant_type {
  title_params?: string;
  dec_params?: string;
  expla_params?: string;
}
export async function nizamDocEditor(
  nizam_doc_contant: nizam_doc_contant_type,
) {
  const path_box = PathBox();

  const new_instructions = `
  
${!nizam_doc_contant.title_params ? "" : `## ${nizam_doc_contant.title_params}`}
${!nizam_doc_contant.dec_params ? "" : `### ${nizam_doc_contant.dec_params}`}
${!nizam_doc_contant.expla_params ? "" : nizam_doc_contant.expla_params}
  ---

  <br>


  `;

  await appendFile(path_box.nizam_Instructions_path, new_instructions);
}
