import { execa } from "execa";
import { useContext } from "../../core/context/runtime.js";

export async function customInstall(
  npx_params: string,
  pkg_command_params: string,
) {
  const { full_project_path } = useContext();
  const pkj_installer = ["giget", "degit", "tiged"];

  let success = false;

  for (const pkj_ins of pkj_installer) {
    try {
      await execa(
        npx_params,
        [
          "--yes",
          pkj_ins,
          pkj_ins === "giget" ? `gh:${pkg_command_params}` : pkg_command_params,
          pkj_ins === "giget" ? `.` : "",
        ],
        {
          cwd: full_project_path,
          timeout: 600000,
        },
      );
      success = true;
      break;
    } catch (e: any) {
      if (e.timedOut) {
        throw "⏱ Timeout, Check your internet connection and try again";
      }

      if (e.exitCode === 1) continue;
      throw e;
    }
  }

  if (!success) {
    throw new Error("All installers failed");
  }
}
