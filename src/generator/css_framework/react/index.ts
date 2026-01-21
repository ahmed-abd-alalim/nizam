import { useContext } from "../../../core/context/runtime.js";
import { Bootstrap } from "./bootstrap.js";
import { Tailwind } from "./tailwindcss.js";
import { Bulma } from "./bulma.js";
import { Foundation } from "./foundation.js";
import { Materialize } from "./materialize.js";
import { installDependencies } from "../../../utils/pkg/index.js";

export async function CSSFrameworkReact() {
  const { user_options } = useContext();
  const lib_list: {
    name: string;
    fun: () => Promise<void>;
    dependencies: (string | null)[];
  }[] = [
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

  await installDependencies({
    lib_list: lib_list,
    user_option_library: user_options.css_framework,
  });
}
