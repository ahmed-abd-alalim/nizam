import { appendFile } from "./fs.js";
import { useContext } from "../core/context/runtime.js";
export async function nizamDocEditor(
  title_params: string,
  dec_params: string,
  code_params: string
) {
  const { full_project_path } = useContext();

  const nizam_doc_path = `${full_project_path}\\NIZAM_DOC.md`;

  const new_instructions = `
${title_params && `### ${title_params}`}

${dec_params && `#### ${dec_params}`}

\`\`\`bash 
${code_params && code_params}
\`\`\`
  ---
  `;

  await appendFile(nizam_doc_path, new_instructions);
}
