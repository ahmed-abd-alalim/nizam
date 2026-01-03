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
    },
    {
      name: "tailwindcss",
      fun: Tailwind,
    },
    {
      name: "bulma",
      fun: Bulma,
    },
    {
      name: "foundation-sites",
      fun: Foundation,
    },
    {
      name: "materialize-css",
      fun: Materialize,
    },
  ];
  const package_identification = async (bkg_name: string) => {
    const pkg_info = await getPkgInfo(bkg_name);
    await appendInPkgFile(pkg_info[0], pkg_info[1]);
  };
  const lip_info = op_list.find((i) =>
    i.name.includes(user_options.CSS_framework.toLowerCase())
  );
  const lip_name = lip_info?.name;
  const lip_fun = lip_info?.fun;

  if (!lip_name || !lip_fun) return;
  await package_identification(lip_name);
  await lip_fun();
}
