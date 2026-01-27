import chalk from "chalk";
import ora from "ora";
import dns from "dns/promises";
import { exec } from "child_process";
import util from "util";
const execAsync = util.promisify(exec);

import { useContext } from "../../core/context/runtime.js";
import { getPkgInfo } from "../../utils/pkg/get_pkg_info.js";
import app_info from "../../assets/config.json" with { type: "json" };

export async function intro() {
  const { pkg_is_installed } = useContext();
  const cols = process.stdout.columns;
  const pkg_list = ["npm", "bun", "pnpm", "yarn"];
  const [, get_nizam_new_v] = await getPkgInfo("create-nizam-app");
  const get_nizam_current_v = app_info.app_info.version;
  const is_new_v = String(get_nizam_new_v) !== String(get_nizam_current_v);

  const lg_logo = chalk.yellowBright(`
            ░▒▒▒                                         
            ▒▓▓▓  ${chalk.redBright.bold("ahmed abd alalim - 3A")}
             ░░░                                         
▓▓▓▒▒▓▓▓▓▓  ▒▓▓▓ ▒▓▓▓▓▓▓▓▓▒  ░▓▓▓▓▓▓▓▓▓▒ ▒▓▓▓▒▓▓▓▓▓░▓▓▓▓▒
▓▓▓▒   ▒▓▓▒ ▒▓▓▓     ░▓▓▓▒       ▒░░▓▓▓▓ ▒▓▓▓  ▒▓▓▓  ▒▓▓▓
▓▓▓▒   ▒▓▓▒ ▒▓▓▓    ░▓▓▓▒     ▓▓▒   ▓▓▓▓ ▒▓▓▓  ▒▓▓▓  ▒▓▓▓
▓▓▓▒   ▒▓▓▒ ▒▓▓▓   ░▓▓▓░     ▓▓▓░   ▓▓▓▓ ▒▓▓▓  ▒▓▓▓  ▒▓▓▓
▓▓▓▒   ▒▓▓▒ ▒▓▓▓  ▒▓▓▓▓▓▓▓▓▓ ▒▓▓▓▓▓▓▓▓▓▓ ▒▓▓▓  ▒▓▓▓  ▒▓▓▓
▒▒▒░   ▒▒▒▒ ░▒▒▒ ░▒▒▒▒▒▒▒▒▒▒   ░▒   ▒▒▒▒ ░▒▒▒  ░▒▒▒  ░▒▒▒  ${chalk.redBright.bold(
    `v${app_info.app_info.version}`,
  )}
                                                         
${is_new_v ? chalk.red("[!] There is a new version with more features. used (npm install -g create-nizam-app) for make update.") : " "}
`);

  const md_logo = chalk.yellowBright(`

            ░░  ${chalk.redBright.bold("ahmed abd alalim - 3A")}
           ░▓▓▒                                    
 ░░░  ░░   ░░░░ ░░░░░░░░░  ░░░░░░░   ░░░  ░░   ░░  
░▓▓▓▒▒▓▓▓▒ ░▓▓▒░▓▓▓▓▓▓▓▒  ░▓▓▓▓▓▓▓▓░ ▒▓▓▒▒▓▓▓▒▒▓▓▓░
░▓▓▓  ░▓▓▒ ░▓▓▒    ▒▓▓▒     ░▒  ▒▓▓▒ ▒▓▓  ▒▓▓░ ▒▓▓░
░▓▓▓  ░▓▓▒ ░▓▓▒   ▒▓▓▒    ▒▓▓   ▒▓▓▒ ▒▓▓  ▒▓▓░ ▒▓▓░
░▓▓▓  ░▓▓▒ ░▓▓▒  ▒▓▓▓▓▓▓▓ ▒▓▓▒ ▒▓▓▓▒ ▒▓▓  ▒▓▓░ ▒▓▓░
░▒▒▒  ░▒▒▒ ░▒▒▒ ▒▒▒▒▒▒▒▒▒  ▒▒▒▒ ▒▒▒░ ▒▒▒  ▒▒▒░ ▒▒▒░  ${chalk.redBright.bold(
    `v${app_info.app_info.version}`,
  )}
                                                   
${is_new_v ? chalk.red("[!] There is a new version with more features. used (npm install -g create-nizam-app) for make update.") : " "}
`);

  const sm_logo = chalk.yellowBright(`
         ░▒▒  ${chalk.redBright.bold("ahmed abd alalim - 3A")}
         ░▓▓░                              
▓▓▓ ▓▓▓▒ ░▓▓░▓▓▓▓▓▓▓▓ ▒▓▓▓▓▓▓▒ ▓▓▓░▓▓▓ ▒▓▓▒
▓▓▓  ▒▓▓░░▓▓░   ▒▓▓▒     ▒░▓▓▓░▓▓▓ ░▓▓▒ ▓▓▓
▓▓▓  ▒▓▓░░▓▓░  ▒▓▓░   ▒▓▒  ▓▓▓░▓▓▓ ░▓▓▒ ▓▓▓
▓▓▓  ▒▓▓░░▓▓░ ▒▓▓▓▓▓▓ ▓▓▓▒▒▓▓▓░▓▓▓ ░▓▓▒ ▓▓▓
▒▒▒  ░▒▒░░▒▒ ▒▒▒▒▒▒▒▒  ░▒  ▒▒▒ ▒▒▒ ░▒▒░ ▒▒▒  ${chalk.redBright.bold(
    `v${app_info.app_info.version}`,
  )}
                                           
${is_new_v ? chalk.red("[!] There is a new version with more features. used (npm install -g create-nizam-app) for make update.") : " "}
`);

  console.clear();

  try {
    await dns.lookup("google.com");
  } catch {
    console.error(chalk.redBright("\n❌ No internet connection"));
    process.exit(1);
  }

  const view = cols && cols < 50 ? sm_logo : cols < 80 ? md_logo : lg_logo;
  console.log(view);
  // eslint-disable-next-line no-async-promise-executor
  await new Promise<void>(async (resolve) => {
    const spinner = ora({
      text: `${chalk.yellowBright("Loading")}`,
      spinner: "dots",
    }).start();

    let i = 0;

    const load = async () => {
      spinner.text = `${chalk.yellowBright("Loading █")}${chalk
        .yellowBright("█")
        .repeat(i / 5)}${"░".repeat(20 - i / 5)} ${chalk.redBright(
        i,
      )} ${chalk.yellowBright("%")}`;

      if (i >= 100) {
        await new Promise((r) => setTimeout(r, 500));
        spinner.stop();
        resolve();
        return;
      }
    };
    for (const pkg of pkg_list) {
      try {
        await execAsync(`${pkg} -v`);
        pkg_is_installed.push(pkg);
      } catch {
        /* empty */
      }
      i += Number((100 / pkg_list.length).toFixed(1));
      load();
      if (is_new_v) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  });

  if (pkg_is_installed.length === 0) {
    console.error(
      chalk.redBright(
        "\n❌ Can't find any package manager for use it. install any one and try again.",
      ),
    );
    process.exit(1);
  }
}
