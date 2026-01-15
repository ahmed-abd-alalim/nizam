import { execa } from "execa";
import { useContext } from "../../core/context/runtime.js";

export async function customInstall(
  npx_params: string,
  pkg_command_params: string,
) {
  const { full_project_path } = useContext();
  const pkg_command = pkg_command_params.split(" ");

  await execa(npx_params, pkg_command, {
    cwd: full_project_path,
    stdio: "ignore",
    timeout: 60000,
    killSignal: "SIGTERM",
  });
}
