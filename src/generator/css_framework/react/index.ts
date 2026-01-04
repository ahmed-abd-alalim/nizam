import { useContext } from "../../../core/context/runtime.js";
import { Bootstrap } from "./bootstrap.js";
import { Tailwind } from "./tailwindcss.js";
import { Bulma } from "./bulma.js";
import { Foundation } from "./foundation.js";
import { Materialize } from "./materialize.js";
import { getPkgInfo, appendInPkgFile } from "../../../utils/pkg/index.js";

export async function CSSFrameworkReact() {
  const { user_options } = useContext();
  const op_list = [
    {
      name: "bootstrap",
      fun: Bootstrap,
      dependencies: ["bootstrap"],
    },
    {
      name: "tailwindcss",
      fun: Tailwind,
      dependencies: ["tailwindcss", "@tailwindcss/vite"],
    },
    {
      name: "bulma",
      fun: Bulma,
      dependencies: ["bulma"],
    },
    {
      name: "foundation",
      fun: Foundation,
      dependencies: ["foundation-sites"],
    },
    {
      name: "materialize",
      fun: Materialize,
      dependencies: ["materialize-css"],
    },
  ];

  const package_identification = async (pkg_name: string) => {
    const pkg_info = await getPkgInfo(pkg_name);
    await appendInPkgFile(pkg_info[0], pkg_info[1]);
  };

  const lib_info = op_list.find((i) =>
    i.name.includes(user_options.CSS_framework.toLowerCase())
  );

  const promises = lib_info?.dependencies.map((pkg_name) =>
    package_identification(pkg_name)
  );
  await Promise.all(promises!);

  const lib_fun = lib_info?.fun;

  await lib_fun!();
}
