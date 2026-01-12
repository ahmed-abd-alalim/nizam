import { useContext } from "../../core/context/runtime.js";
import { installDependencies } from "../../utils/pkg/index.js";
import { extractMainMessage } from "../../utils/filter_error_message.js";
import { ReactHelmetAsync } from "./react-helmet-async.js";
import { Drpogodin } from "./dr-pogodin.js";
import { Unhead } from "./unhead.js";

export async function HeadManagement() {
  const { user_options, operation_state } = useContext();
  const lib_list: {
    name: string;
    fun: () => Promise<void>;
    dependencies: (string | null)[];
  }[] = [
    {
      name: "react helmet async",
      fun: ReactHelmetAsync,
      dependencies: ["react-helmet-async"],
    },
    {
      name: "dr. pogodin react helmet",
      fun: Drpogodin,
      dependencies: ["@dr.pogodin/react-helmet"],
    },
    {
      name: "unhead",
      fun: Unhead,
      dependencies: ["@unhead/react"],
    },
  ];
  try {
    await installDependencies({
      lib_list: lib_list,
      user_option_library: user_options.head_management,
    });

    operation_state.head_management.status = "success";
  } catch (err: any) {
    operation_state.head_management.status = "fatal";
    operation_state.head_management.error_message = extractMainMessage(err);
  }
}
