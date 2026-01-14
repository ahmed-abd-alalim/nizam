import { ensureFile, readFile, writeFile, mkdir } from "../../../utils/fs.js";
import { UsingMark } from "../../../utils/using_mark.js";
import PathBox from "../../../assets/path/path_react.js";
import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import { useContext } from "../../../core/context/runtime.js";
import Data from "../../../assets/storage/resources.json" with { type: 'json' };

export async function Axios() {
  const { user_options } = useContext();
  const path_box = PathBox();
  const { data_fetching } = Data;

  const env_file_data = [
    {
      tage_name: "VITE_API_URL",
      content: `VITE_API_URL=https://example.com`,
    },
  ];

  await mkdir(path_box.api_path, { recursive: true });

  const file_contant = await readFile(path_box.api_axios_file_template);
  await ensureFile(path_box.api_axios_fle_path);
  await writeFile(path_box.api_axios_fle_path, file_contant, "utf8");

  UsingMark(path_box.env_path, env_file_data);
  await nizamDocEditor({
    title_params: user_options.data_fetching,
    expla_params: `
example on how to use:

\`\`\`
import api from "${user_options.add_aliase ? "@" : "."}/api/axios";

function Home() {
  useEffect(() => {
    api.get<Post[]>("/posts").then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      {posts.map(post => <p key={post.id}>{post.title}</p>)}
    </div>
  );
}

export default Home;
\`\`\`

> [!TIP]
> Axios Documentation: [${data_fetching.documentation.axios.des}](${
      data_fetching.documentation.axios.link
    })`,
  });
}
