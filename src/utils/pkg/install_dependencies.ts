import { getPkgInfo, appendInPkgFile } from "./index.js";

export async function installDependencies({
  user_option_library,
  lib_list,
}: {
  user_option_library: string | string[];
  lib_list: {
    name: string;
    fun: () => Promise<void>;
    dependencies: (string | null)[];
  }[];
}) {
  const package_identification = async (pkg_name: string) => {
    const pkg_info = await getPkgInfo(pkg_name);
    await appendInPkgFile(pkg_info[0], pkg_info[1]);
  };

  if (typeof user_option_library === "string") {
    const lib_info = lib_list.find((i) =>
      i.name.includes((user_option_library as string).toLowerCase())
    );

    const fil_dependencies = lib_info?.dependencies.filter((x): x is string =>
      Boolean(x)
    );
    if (fil_dependencies?.length !== 0) {
      for (const dependencie_name of fil_dependencies!) {
        await package_identification(dependencie_name);
      }
    }
    const lib_fun = lib_info?.fun;
    await lib_fun!();
  } else if (Array.isArray(user_option_library)) {
    for (const lib_name of user_option_library as string[]) {
      const lib_info = lib_list.find((i) =>
        i.name.includes(lib_name.toLowerCase())
      );
      const fil_dependencies = lib_info?.dependencies.filter((x): x is string =>
        Boolean(x)
      );
      if (fil_dependencies?.length !== 0) {
        for (const dependencie_name of fil_dependencies!) {
          await package_identification(dependencie_name);
        }
      }
      const lib_fun = lib_info?.fun;
      await lib_fun!();
    }
  }
}
