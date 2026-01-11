import { useContext } from "../../../core/context/runtime.js";
import { installDependencies } from "../../../utils/pkg/index.js";
import { ReactContextAPI } from "./react-context.js";
import { ReduxToolkit } from "./redux-toolkit.js";
import { Zustand } from "./zustand.js";
export async function StateManagementReact() {
  const { user_options } = useContext();
  const lib_list: {
    name: string;
    fun: () => Promise<void>;
    dependencies: (string | null)[];
  }[] = [
    {
      name: "react context api",
      fun: ReactContextAPI,
      dependencies: [],
    },
    {
      name: "redux toolkit",
      fun: ReduxToolkit,
      dependencies: ["@reduxjs/toolkit", "react-redux"],
    },
    {
      name: "zustand",
      fun: Zustand,
      dependencies: ["zustand"],
    },
  ];

  await installDependencies({
    lib_list: lib_list,
    user_option_library: user_options.state_management,
  });
}
