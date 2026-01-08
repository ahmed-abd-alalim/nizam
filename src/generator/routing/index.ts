import { useContext } from "../../core/context/runtime.js";
import { installDependencies } from "../../utils/pkg/index.js";
import { extractMainMessage } from "../../utils/filter_error_message.js";
import { ReactRouter } from "./react-router.js";
import { TanStackRouter } from "./tan-stack-route.js";
import { Wouter } from "./wouter.js";

export async function RoutingLibrary() {
  const { user_options, operation_state } = useContext();
  const lib_list: {
    name: string;
    fun: () => Promise<void>;
    dependencies: (string | null)[];
  }[] = [
    {
      name: "react router",
      fun: ReactRouter,
      dependencies: ["react-router-dom"],
    },
    {
      name: "tanstack router",
      fun: TanStackRouter,
      dependencies: ["@tanstack/react-router"],
    },
    {
      name: "wouter",
      fun: Wouter,
      dependencies: ["wouter"],
    },
  ];

  try {
    await installDependencies({
      lib_list: lib_list,
      user_option_library: user_options.routing_library,
    });

    operation_state.routing_library.status = "success";
  } catch (err) {
    operation_state.routing_library.status = "fatal";
    operation_state.routing_library.error_message = extractMainMessage(err);
  }
}
