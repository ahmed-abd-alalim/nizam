import { useContext } from "../../../core/context/runtime.js";
import { MUI } from "./mui.js";
import { Ant } from "./antd.js";
import { Headless } from "./headless.js";
import { installDependencies } from "../../../utils/pkg/index.js";

export async function UILibraryReact() {
  const { user_options } = useContext();
  const lib_list: {
    name: string;
    fun: () => Promise<void>;
    dependencies: (string | null)[];
  }[] = [
    {
      name: "material ui",
      fun: MUI,
      dependencies: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
    {
      name: "ant design",
      fun: Ant,
      dependencies: ["antd"],
    },
    {
      name: "headless ui",
      fun: Headless,
      dependencies: ["@headlessui/react"],
    },
  ];

  await installDependencies({
    lib_list: lib_list,
    user_option_library: user_options.ui_library,
  });
}
