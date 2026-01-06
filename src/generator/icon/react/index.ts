import { useContext } from "../../../core/context/runtime.js";
import { getPkgInfo, appendInPkgFile } from "../../../utils/pkg/index.js";
import { ReactIcons } from "./react-icons.js";
import { LucideReact } from "./lucide-react.js";
import { MaterialIcons } from "./material-icons.js";
import { LordIcon } from "./lord-icon.js";

export async function IconLibraryReact() {
  const { user_options } = useContext();
  const check_mui_pkg = user_options.ui_library.find((i) =>
    i.includes("Material UI")
  );

  const lib_list = [
    {
      name: "react icons",
      fun: ReactIcons,
      dependencies: ["react-icons"],
    },
    {
      name: "lucide react",
      fun: LucideReact,
      dependencies: ["lucide-react"],
    },
    {
      name: "material icons",
      fun: MaterialIcons,
      dependencies: [
        "@mui/icons-material",
        !check_mui_pkg ? "@mui/material" : null,
        !check_mui_pkg ? "@emotion/react" : null,
        !check_mui_pkg ? "@emotion/styled" : null,
      ],
    },
    {
      name: "lord icon",
      fun: LordIcon,
      dependencies: ["@lordicon/react"],
    },
  ];

  const package_identification = async (pkg_name: string) => {
    const pkg_info = await getPkgInfo(pkg_name);
    await appendInPkgFile(pkg_info[0], pkg_info[1]);
  };

  const promises = user_options.icon_library.map(async (lib_name) => {
    const lib_info = lib_list.find((i) =>
      i.name.includes(lib_name.toLowerCase())
    );
    const promises = lib_info?.dependencies
      .filter((x): x is string => Boolean(x))
      .map((dependencie_name) => package_identification(dependencie_name));
    await Promise.all(promises!);
    const lib_fun = lib_info?.fun;
    await lib_fun!();
  });
  await Promise.all(promises!);
}
