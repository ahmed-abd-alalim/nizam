import { execa } from "execa";
import { useContext } from "../core/context/runtime.js";

export async function installDeps(
  npx_params: string,
  pkg_command_params: string[]
) {
  const { full_project_path } = useContext();
  try {
    await execa(npx_params, pkg_command_params, {
      cwd: full_project_path,
      shell: true,
      stdio: "ignore",
    });
  } catch (err: any) {
    throw err;
  }
}

export async function install() {
  const { full_project_path } = useContext();
  try {
    await execa("npm", ["install"], {
      cwd: full_project_path,
      stdio: "ignore",
    });
  } catch (err: any) {
    throw err;
  }
}
