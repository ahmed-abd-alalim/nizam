import chalk from "chalk";
import type { operation_state_type } from "../assets/type.js";
export async function operations(
  name_params: string,
  state_params: operation_state_type
): Promise<null> {
  // console.clear();
  console.log(
    `${name_params} = ${state_params.status} \n ${state_params.error_message}`
  );
  return null;
}
