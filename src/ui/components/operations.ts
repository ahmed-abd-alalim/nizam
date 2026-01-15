import chalk from "chalk";
import ora from "ora";
import { useContext } from "../../core/context/runtime.js";
import { operation_state_type } from "../../assets/type.js";

export async function operations(
  opration_fun: () => Promise<void>,
  opration_name: string,
  opration_dis: string,
): Promise<void> {
  const { operation_state } = useContext();

  const spinner = ora(chalk.yellowBright(`${opration_dis}....`)).start();

  await opration_fun();

  const is_ok =
    operation_state[opration_name as keyof operation_state_type].status;
  const error_message =
    operation_state[opration_name as keyof operation_state_type].error_message;
  if (is_ok === "success")
    spinner.stopAndPersist({
      symbol: `${chalk.yellowBright("[")}${chalk.green(
        "✔",
      )}${chalk.yellowBright("]")}`,
      text: `${chalk.greenBright(`${opration_dis} is done.`)}`,
    });
  else {
    spinner.stopAndPersist({
      symbol: `${chalk.yellowBright("[")}${chalk.red("X")}${chalk.yellowBright(
        "]",
      )}`,
      text: `${chalk.redBright(`${opration_dis} is fail.`)}`,
    });

    console.log(
      `${chalk.bold.red("[x]==>")} ${chalk.redBright(error_message)}`,
    );
  }
}
