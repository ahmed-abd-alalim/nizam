import { ensureFile, readFile, writeFile, mkdir } from "../../../utils/fs.js";
import { UsingMark } from "../../../utils/using_mark.js";
import PathBox from "../../../assets/path/path_react.js";
import { nizamDocEditor } from "../../../utils/nizam_doc_editor.js";
import { useContext } from "../../../core/context/runtime.js";
import Data from "../../../assets/storage/resources.json" with { type: 'json' };

export async function TanStackQuery() {
  const { user_options } = useContext();
  const path_box = PathBox();
  const{data_fetching} = Data;

  const main_file_data = [
    {
      tage_name: "import_query_client_provider",
      content: `import { QueryClient, QueryClientProvider } from "@tanstack/react-query";`,
    },
    {
      tage_name: "using_query_client",
      content: `const queryClient = new QueryClient();`,
    },
    {
      tage_name: "open_tage_query_client_provider",
      content: `<QueryClientProvider client={queryClient}>`,
    },
    {
      tage_name: "close_tage_query_client_provider",
      content: `</QueryClientProvider>`,
    },
  ];

  const env_file_data = [
    {
      tage_name: "VITE_API_URL",
      content: `VITE_API_URL=https://example.com`,
    },
  ];

  await mkdir(path_box.api_path, { recursive: true });

  const file_contant = await readFile(path_box.api_http_file_template);
  await ensureFile(path_box.api_http_file_path);
  await writeFile(path_box.api_http_file_path, file_contant, "utf8");

  UsingMark(path_box.env_path, env_file_data);
  UsingMark(path_box.main_react_path, main_file_data);

  await nizamDocEditor({
    title_params: user_options.data_fetching,
    expla_params: `
example on how to use:

\`\`\`
import { useQuery } from "@tanstack/react-query";
import { http, Post } from "${user_options.add_aliase ? "@" : "."}/api/http";

function Home() {
 const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => http("/posts"),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return <div>{data?.map(post => <p key={post.id}>{post.title}</p>)}</div>;
}

export default Home;
\`\`\`

> [!TIP]
> TanStack Query Documentation: [${
     data_fetching.documentation.tanstack_query.des
    }](${data_fetching.documentation.tanstack_query.link})`,
  });
}
