import { say } from "../index.js";

export async function exit(exit_message: string) {
  await say(exit_message);
  await new Promise((r) => setTimeout(r, 1000));
  process.exitCode = 0;
}
