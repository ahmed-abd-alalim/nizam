import { useContext } from "../../../core/context/runtime.js";
import { installDependencies } from "../../../utils/pkg/index.js";
import { Axios } from "./axios.js";
import { TanStackQuery } from "./tanstack-query.js";
import { SWR } from "./swr.js";

export async function DataFetchingReact() {
  const { user_options } = useContext();
  const lib_list: {
    name: string;
    fun: () => Promise<void>;
    dependencies: (string | null)[];
  }[] = [
    {
      name: "axios",
      fun: Axios,
      dependencies: ["axios"],
    },
    {
      name: "tanstack query",
      fun: TanStackQuery,
      dependencies: ["@tanstack/react-query"],
    },
    {
      name: "swr",
      fun: SWR,
      dependencies: ["swr"],
    },
  ];

  await installDependencies({
    lib_list: lib_list,
    user_option_library: user_options.data_fetching,
  });
}
