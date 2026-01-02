import { useContext } from "../../../core/context/runtime.js";
import { Bootstrap } from "./bootstrap.js";
import { Tailwind } from "./tailwindcss.js";
import { getPkgInfo, appendInPkgFile } from "../../../utils/pkg/index.js";

export async function CSSFrameworkReact() {
  const { user_options } = useContext();

  try {
    if (user_options.CSS_framework === "Bootstrap") {
      const pkg_info = await getPkgInfo("bootstrap");
      await appendInPkgFile(pkg_info[0], pkg_info[1]);
      await Bootstrap();
    } else if (user_options.CSS_framework === "Tailwindcss") {
      const pkg_info = await getPkgInfo("tailwindcss");
      await appendInPkgFile(pkg_info[0], pkg_info[1]);
      await Tailwind();
    }
  } catch (err: any) {
    throw err;
  }
}
