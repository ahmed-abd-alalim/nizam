import chalk from "chalk";
import ora from "ora";
import app_info from "../../assets/config.json" with { type: 'json' };
import { exec } from "child_process";
import util from "util";
const execAsync = util.promisify(exec);
import { useContext } from "../../core/context/runtime.js";

export async function intro() {
  console.clear();

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
    `v${app_info.app_info.version}`
  )}
                                                         
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
    `v${app_info.app_info.version}`
  )}
                                                   
`);

  const sm_logo = chalk.yellowBright(`
         ░▒▒  ${chalk.redBright.bold("ahmed abd alalim - 3A")}
         ░▓▓░                              
▓▓▓ ▓▓▓▒ ░▓▓░▓▓▓▓▓▓▓▓ ▒▓▓▓▓▓▓▒ ▓▓▓░▓▓▓ ▒▓▓▒
▓▓▓  ▒▓▓░░▓▓░   ▒▓▓▒     ▒░▓▓▓░▓▓▓ ░▓▓▒ ▓▓▓
▓▓▓  ▒▓▓░░▓▓░  ▒▓▓░   ▒▓▒  ▓▓▓░▓▓▓ ░▓▓▒ ▓▓▓
▓▓▓  ▒▓▓░░▓▓░ ▒▓▓▓▓▓▓ ▓▓▓▒▒▓▓▓░▓▓▓ ░▓▓▒ ▓▓▓
▒▒▒  ░▒▒░░▒▒ ▒▒▒▒▒▒▒▒  ░▒  ▒▒▒ ▒▒▒ ░▒▒░ ▒▒▒  ${chalk.redBright.bold(
    `v${app_info.app_info.version}`
  )}
                                           
`);

  const { pkg_is_installed } = useContext();
  const cols = process.stdout.columns;
  const view = cols && cols < 50 ? sm_logo : cols < 80 ? md_logo : lg_logo;
  const pkg_list = ["npm", "bun", "pnpm", "yarn"];

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
        i
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
      } catch { /* empty */ }
      i += Number((100 / pkg_list.length).toFixed(1));
      load();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  });

  if (pkg_is_installed.length === 0) {
    throw new Error(
      "Can't find any package manager for use it. install any one and try again."
    );
  }
}
