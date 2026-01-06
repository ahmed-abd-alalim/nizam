import { useContext } from "../../../core/context/runtime.js";
import { ReactIcons } from "./react-icons.js";
import { LucideReact } from "./lucide-react.js";
import { MaterialIcons } from "./material-icons.js";
import { LordIcon } from "./lord-icon.js";
import { installDependencies } from "../../../utils/pkg/index.js";

export async function IconLibraryReact() {
  const { user_options } = useContext();
  const check_mui_pkg = user_options.ui_library.find((i) =>
    i.includes("Material UI")
  );

  const lib_list: {
    name: string;
    fun: () => Promise<void>;
    dependencies: (string | null)[];
  }[] = [
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

  await installDependencies({
    lib_list: lib_list,
    user_option_library: user_options.icon_library,
  });
}
