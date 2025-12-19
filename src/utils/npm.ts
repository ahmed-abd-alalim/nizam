import { execa } from "execa";

export async function installDeps(
  npx_params: string,
  pkg_command_params: string[]
) {
  try {
    await execa(npx_params, pkg_command_params, {
      stdio: "ignore",
    });
  } catch (err: any) {
    throw err;
  }
}
