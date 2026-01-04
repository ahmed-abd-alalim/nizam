import { useContext } from "../../../core/context/runtime.js";
import { MUI } from "./mui.js";
import { Ant } from "./antd.js";
import { Headless } from "./headless.js";
import { Blueprint } from "./blueprint.js";
import { getPkgInfo, appendInPkgFile } from "../../../utils/pkg/index.js";

export async function UILibraryReact() {
  const { user_options } = useContext();
  const lib_list = [
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
    {
      name: "blueprint ui",
      fun: Blueprint,
      dependencies: ["@blueprintui/components", "@blueprintui/layout"],
    },
  ];

  const package_identification = async (pkg_name: string) => {
    const pkg_info = await getPkgInfo(pkg_name);
    await appendInPkgFile(pkg_info[0], pkg_info[1]);
  };

  const promises = user_options.ui_library.map(async (lib_name) => {
    const lib_info = lib_list.find((i) =>
      i.name.includes(lib_name.toLowerCase())
    );
    const promises = lib_info?.dependencies.map((dependencie_name) =>
      package_identification(dependencie_name)
    );
    await Promise.all(promises!);
    const lib_fun = lib_info?.fun;
    await lib_fun!();
  });
  await Promise.all(promises!);
}
