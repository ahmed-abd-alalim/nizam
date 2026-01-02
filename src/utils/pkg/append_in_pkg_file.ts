import { readJson, writeJson } from "../fs.js";
import pathBox from "../../assets/path/path_react.js";

export async function appendInPkgFile(pkg_name: string, pkg_v: string) {
  const path_box = pathBox();
  try {
    const package_json = await readJson(path_box.package_json_path, "utf8");
    package_json.dependencies ??= {};
    package_json.dependencies[pkg_name] = `^${pkg_v}`;

    await writeJson(path_box.package_json_path, package_json, { spaces: 2 });
  } catch (err: any) {
    throw err;
  }
}
