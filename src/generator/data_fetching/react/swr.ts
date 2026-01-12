import { ensureFile, readFile, writeFile, mkdir } from "../../../utils/fs.js";
import { UsingMark } from "../../../utils/using_mark.js";
import PathBox from "../../../assets/path/path_react.js";
import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import { useContext } from "../../../core/context/runtime.js";
import Data from "../../../assets/config.json" with { type: 'json' };

export async function SWR() {
  const { user_options } = useContext();
  const path_box = PathBox();
  const appData = Data;

  const env_file_data = [
    {
      tage_name: "VITE_API_URL",
      content: `VITE_API_URL=https://example.com`,
    },
  ];

  await mkdir(path_box.api_path, { recursive: true });

  const file_contant = await readFile(path_box.api_fetcher_file_template);
  await ensureFile(path_box.api_fetcher_file_path);
  await writeFile(path_box.api_fetcher_file_path, file_contant, "utf8");

  UsingMark(path_box.env_path, env_file_data);

  await nizamDocEditor({
    title_params: user_options.data_fetching,
    expla_params: `
example on how to use:

\`\`\`
import useSWR from "swr";
import { fetcher } from "${user_options.add_aliase ? "@" : "."}/api/fetcher";

function Home() {
  const { data, error } = useSWR("/posts", fetcher);

  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Loading...</p>;

  return <div>{data.map(post => <p key={post.id}>{post.title}</p>)}</div>;
}

export default Home;
\`\`\`

> [!TIP]
> SWR Documentation: [${appData.pkg_documentation.data_fetching.swr.des}](${appData.pkg_documentation.data_fetching.swr.link})`,
  });
}
