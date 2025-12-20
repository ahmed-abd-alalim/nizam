import chalk from "chalk";
import ora from "ora";

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
▒▒▒░   ▒▒▒▒ ░▒▒▒ ░▒▒▒▒▒▒▒▒▒▒   ░▒   ▒▒▒▒ ░▒▒▒  ░▒▒▒  ░▒▒▒
                                                         
`);

  const md_logo = chalk.yellowBright(`

            ░░  ${chalk.redBright.bold("ahmed abd alalim - 3A")}
           ░▓▓▒                                    
 ░░░  ░░   ░░░░ ░░░░░░░░░  ░░░░░░░   ░░░  ░░   ░░  
░▓▓▓▒▒▓▓▓▒ ░▓▓▒░▓▓▓▓▓▓▓▒  ░▓▓▓▓▓▓▓▓░ ▒▓▓▒▒▓▓▓▒▒▓▓▓░
░▓▓▓  ░▓▓▒ ░▓▓▒    ▒▓▓▒     ░▒  ▒▓▓▒ ▒▓▓  ▒▓▓░ ▒▓▓░
░▓▓▓  ░▓▓▒ ░▓▓▒   ▒▓▓▒    ▒▓▓   ▒▓▓▒ ▒▓▓  ▒▓▓░ ▒▓▓░
░▓▓▓  ░▓▓▒ ░▓▓▒  ▒▓▓▓▓▓▓▓ ▒▓▓▒ ▒▓▓▓▒ ▒▓▓  ▒▓▓░ ▒▓▓░
░▒▒▒  ░▒▒▒ ░▒▒▒ ▒▒▒▒▒▒▒▒▒  ▒▒▒▒ ▒▒▒░ ▒▒▒  ▒▒▒░ ▒▒▒░
                                                   
`);

  const sm_logo = chalk.yellowBright(`
         ░▒▒  ${chalk.redBright.bold("ahmed abd alalim - 3A")}
         ░▓▓░                              
▓▓▓ ▓▓▓▒ ░▓▓░▓▓▓▓▓▓▓▓ ▒▓▓▓▓▓▓▒ ▓▓▓░▓▓▓ ▒▓▓▒
▓▓▓  ▒▓▓░░▓▓░   ▒▓▓▒     ▒░▓▓▓░▓▓▓ ░▓▓▒ ▓▓▓
▓▓▓  ▒▓▓░░▓▓░  ▒▓▓░   ▒▓▒  ▓▓▓░▓▓▓ ░▓▓▒ ▓▓▓
▓▓▓  ▒▓▓░░▓▓░ ▒▓▓▓▓▓▓ ▓▓▓▒▒▓▓▓░▓▓▓ ░▓▓▒ ▓▓▓
▒▒▒  ░▒▒░░▒▒ ▒▒▒▒▒▒▒▒  ░▒  ▒▒▒ ▒▒▒ ░▒▒░ ▒▒▒
                                           
`);

  const cols = process.stdout.columns;
  const view = cols && cols < 50 ? sm_logo : cols < 80 ? md_logo : lg_logo;

  console.log(view);

  await new Promise<void>((resolve) => {
    const spinner = ora({
      text: "Loading",
      spinner: "dots",
    }).start();

    let i = 0;

    const load = () => {
      spinner.text = `${chalk.yellowBright("Loading █")}${chalk
        .yellowBright("█")
        .repeat(i / 5)}${"░".repeat(20 - i / 5)} ${chalk.redBright(
        i
      )} ${chalk.yellowBright("%")}`;

      if (i >= 100) {
        spinner.succeed("Done!");
        resolve();
        return;
      }

      i++;
      setTimeout(load, 40);
    };

    load();
  });
}
